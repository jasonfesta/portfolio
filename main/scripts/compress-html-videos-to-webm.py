#!/usr/bin/env python3
"""Compress HTML-referenced videos to high-quality WebM outputs.

The script reads html-video-assets.csv, writes WebM files next to the source
assets, and produces a manifest with before/after sizes. Originals are never
deleted or modified by this script.
"""

from __future__ import annotations

import argparse
import csv
import json
import subprocess
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
SOURCE_CSV = ROOT / "html-video-assets.csv"
MANIFEST = ROOT / "html-video-assets-webm-compression.csv"


def run_json(command: list[str]) -> dict:
    output = subprocess.check_output(command, text=True)
    return json.loads(output)


def probe(path: Path) -> dict:
    data = run_json(
        [
            "ffprobe",
            "-v",
            "error",
            "-print_format",
            "json",
            "-show_entries",
            "format=duration,bit_rate,size:stream=codec_type,codec_name,width,height",
            str(path),
        ]
    )
    video = next((stream for stream in data.get("streams", []) if stream.get("codec_type") == "video"), {})
    audio = next((stream for stream in data.get("streams", []) if stream.get("codec_type") == "audio"), None)
    return {
        "width": int(video.get("width") or 0),
        "height": int(video.get("height") or 0),
        "codec": video.get("codec_name") or "",
        "has_audio": audio is not None,
        "duration_s": float(data.get("format", {}).get("duration") or 0),
        "bitrate_kbps": int(data.get("format", {}).get("bit_rate") or 0) / 1000,
    }


def output_path(source: Path, suffix: str) -> Path:
    return source.with_name(f"{source.stem}{suffix}.webm")


def scale_filter(width: int, height: int, max_dimension: int) -> str:
    if max(width, height) <= max_dimension:
        return "scale=trunc(iw/2)*2:trunc(ih/2)*2"

    if width >= height:
        return f"scale='min({max_dimension},iw)':-2"

    return f"scale=-2:'min({max_dimension},ih)'"


def crf_for(width: int, height: int) -> int:
    pixels = width * height
    if pixels >= 3840 * 2160:
        return 31
    if pixels >= 1920 * 1080:
        return 29
    return 28


def compress(source: Path, destination: Path, profile: dict, args: argparse.Namespace) -> None:
    destination.parent.mkdir(parents=True, exist_ok=True)
    vf = scale_filter(profile["width"], profile["height"], args.max_dimension)
    command = [
        "ffmpeg",
        "-hide_banner",
        "-y" if args.overwrite else "-n",
        "-i",
        str(source),
        "-map",
        "0:v:0",
        "-c:v",
        "libvpx-vp9",
        "-b:v",
        "0",
        "-crf",
        str(args.crf if args.crf is not None else crf_for(profile["width"], profile["height"])),
        "-deadline",
        "good",
        "-cpu-used",
        str(args.cpu_used),
        "-row-mt",
        "1",
        "-tile-columns",
        "2",
        "-frame-parallel",
        "1",
        "-auto-alt-ref",
        "1",
        "-pix_fmt",
        "yuv420p",
        "-vf",
        vf,
    ]

    if args.keep_audio and profile["has_audio"]:
        command += ["-map", "0:a:0?", "-c:a", "libopus", "-b:a", args.audio_bitrate]
    else:
        command += ["-an"]

    command += [str(destination)]
    subprocess.run(command, check=True)


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--limit", type=int, help="Only compress the first N largest assets.")
    parser.add_argument(
        "--asset",
        action="append",
        help="Compress only this asset path from html-video-assets.csv. Can be passed more than once.",
    )
    parser.add_argument(
        "--source-extension",
        action="append",
        help="Only compress source assets with this extension, such as mp4 or webm. Can be passed more than once.",
    )
    parser.add_argument("--overwrite", action="store_true", help="Overwrite generated WebM outputs.")
    parser.add_argument("--keep-audio", action="store_true", help="Keep audio using Opus.")
    parser.add_argument("--audio-bitrate", default="96k")
    parser.add_argument("--max-dimension", type=int, default=1920)
    parser.add_argument("--crf", type=int, help="Override adaptive CRF.")
    parser.add_argument("--cpu-used", type=int, default=2)
    parser.add_argument("--suffix", default="-compressed", help="Suffix for generated WebM filenames.")
    args = parser.parse_args()

    rows = list(csv.DictReader(SOURCE_CSV.open()))
    if args.asset:
        requested = set(args.asset)
        rows = [row for row in rows if row["asset"] in requested]
        missing = requested - {row["asset"] for row in rows}
        if missing:
            raise SystemExit(f"Asset not found in {SOURCE_CSV.name}: {', '.join(sorted(missing))}")

    if args.source_extension:
        allowed_extensions = {extension.lower().lstrip(".") for extension in args.source_extension}
        rows = [
            row
            for row in rows
            if Path(row["asset"]).suffix.lower().lstrip(".") in allowed_extensions
        ]

    if args.limit:
        rows = rows[: args.limit]

    results = []
    for row in rows:
        source = ROOT / row["asset"]
        destination = output_path(source, args.suffix)
        if not source.exists():
            results.append({**row, "output": str(destination.relative_to(ROOT)), "status": "missing_source"})
            continue

        profile = probe(source)
        status = "skipped_existing"
        if args.overwrite or not destination.exists():
            compress(source, destination, profile, args)
            status = "compressed"

        output_bytes = destination.stat().st_size if destination.exists() else 0
        input_bytes = source.stat().st_size
        results.append(
            {
                "asset": row["asset"],
                "output": str(destination.relative_to(ROOT)),
                "status": status,
                "input_kb": f"{input_bytes / 1024:.2f}",
                "output_kb": f"{output_bytes / 1024:.2f}",
                "saved_kb": f"{(input_bytes - output_bytes) / 1024:.2f}",
                "saved_percent": f"{((input_bytes - output_bytes) / input_bytes * 100) if input_bytes else 0:.2f}",
                "width": profile["width"],
                "height": profile["height"],
                "duration_s": f"{profile['duration_s']:.3f}",
                "input_codec": profile["codec"],
                "audio_dropped": str(profile["has_audio"] and not args.keep_audio).lower(),
            }
        )

    with MANIFEST.open("w", newline="") as handle:
        fieldnames = [
            "asset",
            "output",
            "status",
            "input_kb",
            "output_kb",
            "saved_kb",
            "saved_percent",
            "width",
            "height",
            "duration_s",
            "input_codec",
            "audio_dropped",
        ]
        writer = csv.DictWriter(handle, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(results)

    total_input = sum(float(item.get("input_kb", 0)) for item in results)
    total_output = sum(float(item.get("output_kb", 0)) for item in results)
    print(f"Manifest: {MANIFEST}")
    print(f"Processed: {len(results)}")
    print(f"Input KB: {total_input:.2f}")
    print(f"Output KB: {total_output:.2f}")
    print(f"Saved KB: {total_input - total_output:.2f}")


if __name__ == "__main__":
    main()
