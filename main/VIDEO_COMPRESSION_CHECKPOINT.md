# Video Compression Checkpoint

Paused on: 2026-07-08 around 5:45 PM ET.

## Current State

- Compression is stopped. No active ffmpeg/compression process should be running.
- Originals were backed up before compression at `video-backups/20260708-154642-html-video-assets`.
- Source list of HTML-hit videos: `html-video-assets.csv`.
- Compression script: `scripts/compress-html-videos-to-webm.py`.
- HTML has **not** been updated yet, so local pages still use the original video URLs unless they already referenced WebM before this work.
- Existing WebM sources were not worth re-encoding: the high-quality re-encodes were larger, so those generated WebM-to-WebM outputs were removed.

## Completed So Far

- HTML-hit MP4 assets: 84
- Completed `-hq.webm` MP4 outputs: 14
- Remaining MP4 outputs: 70
- Original size for completed MP4s: 910,767.66 KB
- Generated size for completed WebMs: 242,567.04 KB
- Approx savings so far on completed MP4s: 668,200.62 KB

| Source | Output | Source KB | Output KB | Savings |
|---|---:|---:|---:|---:|
| `assets/products/wayve-superbowl.mp4` | `assets/products/wayve-superbowl-hq.webm` | 231,871.23 | 39,611.64 | 82.92% |
| `assets/products/wayve-ad-gen-09.mp4` | `assets/products/wayve-ad-gen-09-hq.webm` | 219,388.06 | 39,269.58 | 82.10% |
| `assets/products/darwin-paid.mp4` | `assets/products/darwin-paid-hq.webm` | 132,875.82 | 30,986.72 | 76.68% |
| `assets/products/wayve-ad-gen-21.mp4` | `assets/products/wayve-ad-gen-21-hq.webm` | 98,349.07 | 10,898.40 | 88.92% |
| `assets/products/opensea-cut-1_1_cloud_prob4.mp4` | `assets/products/opensea-cut-1_1_cloud_prob4-hq.webm` | 59,474.85 | 38,720.19 | 34.90% |
| `assets/products/wayve-mrbeast-pepsi.mp4` | `assets/products/wayve-mrbeast-pepsi-hq.webm` | 28,055.18 | 18,945.28 | 32.47% |
| `assets/products/wayve-ad-gen-16.mp4` | `assets/products/wayve-ad-gen-16-hq.webm` | 23,787.50 | 5,263.52 | 77.87% |
| `assets/products/brand_avatars.mp4` | `assets/products/brand_avatars-hq.webm` | 19,712.83 | 3,423.29 | 82.63% |
| `assets/products/wayve-ad-gen-22.mp4` | `assets/products/wayve-ad-gen-22-hq.webm` | 17,802.53 | 6,594.38 | 62.96% |
| `assets/products/creator_avatars.mp4` | `assets/products/creator_avatars-hq.webm` | 17,708.55 | 1,838.52 | 89.62% |
| `assets/products/wayve-theo-rizzler.mp4` | `assets/products/wayve-theo-rizzler-hq.webm` | 17,074.44 | 12,234.24 | 28.35% |
| `assets/products/wayve-ad-gen-14.mp4` | `assets/products/wayve-ad-gen-14-hq.webm` | 15,145.91 | 3,328.89 | 78.02% |
| `assets/products/wayve-design-grid-01.mp4` | `assets/products/wayve-design-grid-01-hq.webm` | 14,764.83 | 7,279.54 | 50.70% |
| `assets/products/darwin-ad-gens.mp4` | `assets/products/darwin-ad-gens-hq.webm` | 14,756.85 | 24,172.86 | -63.81% |

## Resume Command

Use this from `portfolio/main` when ready to let it run:

```sh
python3 scripts/compress-html-videos-to-webm.py --source-extension mp4 --suffix=-hq --crf 27 --cpu-used 4 --max-dimension 1920
```

This skips any existing `-hq.webm` output unless `--overwrite` is added.

## Remaining MP4 Assets

- `assets/products/wayve-header.mp4`
- `assets/products/wayve-ad-gen-24.mp4`
- `assets/products/wayve-design-grid-02.mp4`
- `assets/products/wayve-ad-gen-17.mp4`
- `assets/products/wayve-ad-gen-15.mp4`
- `assets/products/wayve-ad-gen-19.mp4`
- `assets/products/wayve-ad-gen-18.mp4`
- `assets/products/wayve-ad-gen-13.mp4`
- `assets/products/darwin_ads.mp4`
- `assets/products/wayve-ad-gen-11.mp4`
- `assets/products/wayve-ad-gen-12.mp4`
- `assets/products/sogni-style-14.mp4`
- `assets/products/ad-gens-new-02.mp4`
- `assets/products/wayve-ad-gen-02.mp4`
- `assets/products/sogni-style-09.mp4`
- `assets/products/wayve-ad-gen-04.mp4`
- `assets/products/wayve-ad-gen-07.mp4`
- `assets/products/wayve-ad-gen-10.mp4`
- `assets/products/ad-gens-new-03.mp4`
- `assets/products/wayve-ad-gen-05.mp4`
- `assets/products/ad-gens-new-19.mp4`
- `assets/products/wayve-ad-gen-01.mp4`
- `assets/products/sogni-brand-grid-video-14.mp4`
- `assets/products/sogni-style-01.mp4`
- `assets/products/wayve-ad-gen-08.mp4`
- `assets/products/ad-gens-new-07.mp4`
- `assets/products/sogni-brand-grid-video-13.mp4`
- `assets/products/sogni-style-03.mp4`
- `assets/products/wayve-ad-gen-03.mp4`
- `assets/products/sogni-style-06.mp4`
- ...and 40 more MP4 assets listed in `html-video-assets.csv` without matching `-hq.webm` outputs.

## After Compression Finishes

1. Verify the generated `-hq.webm` files are not larger than their sources.
2. Spot-check visual quality on the largest/most visible videos.
3. Update HTML/source content to prefer the `-hq.webm` files.
4. Rebuild generated `dist` pages if source content/templates are updated.
