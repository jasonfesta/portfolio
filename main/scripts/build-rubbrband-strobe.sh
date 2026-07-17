#!/usr/bin/env bash
# Builds a 0.4s-per-cut strobe montage that rotates through the Rubbrband source
# clips, sampling each across its full 3s. Outputs 16:9 (header) and 9:16 (card)
# webm files into assets/products.
#
# Uses per-segment extraction + concat (fast + bounded) instead of one giant
# filter_complex, which is pathologically slow with many trim branches.
set -euo pipefail

cd "$(dirname "$0")/.."
OUT_DIR="assets/products"

CLIPS=(
  "/Users/jasonfesta/Downloads/Cursor/dm3_scene02_soldering_klingO3pro_3s.mp4"
  "/Users/jasonfesta/Downloads/Kalshi/scene02_klingO3_3s.mp4"
  "/Users/jasonfesta/Downloads/Cursor/dm3_scene07_data_flight_klingO3pro_3s.mp4"
  "/Users/jasonfesta/Downloads/Kalshi/scene03_klingO3_3s.mp4"
  "/Users/jasonfesta/Downloads/Cursor/dm3_scene09_camera_gate_klingO3pro_3s.mp4"
  "/Users/jasonfesta/Downloads/Kalshi/scene05_klingO3_3s.mp4"
  "/Users/jasonfesta/Downloads/Cursor/dm3_scene04_soundstage_klingO3pro_3s.mp4"
  "/Users/jasonfesta/Downloads/Kalshi/scene08_klingO3_3s.mp4"
)

SEG=0.4          # seconds per cut
ROTATIONS=5      # passes through the clip set
STEP=0.6         # how far each rotation advances into each clip
FPS=30

NCLIPS=${#CLIPS[@]}

# render <output_file> <scale_filter>
render() {
  local out="$1"; local scale="$2"
  local tmp; tmp=$(mktemp -d)
  local list="$tmp/list.txt"; : > "$list"
  local idx=0

  for ((r=0; r<ROTATIONS; r++)); do
    start=$(awk "BEGIN{printf \"%.3f\", $r*$STEP}")
    for ((i=0; i<NCLIPS; i++)); do
      seg=$(printf "%s/seg_%03d.webm" "$tmp" "$idx")
      ffmpeg -nostdin -loglevel error -y -i "${CLIPS[$i]}" -ss "$start" -t "$SEG" \
        -vf "${scale},fps=${FPS},setsar=1" -an \
        -c:v libvpx-vp9 -crf 33 -b:v 0 -pix_fmt yuv420p -r "$FPS" \
        -deadline realtime -cpu-used 6 -row-mt 1 \
        "$seg"
      echo "file '$seg'" >> "$list"
      idx=$((idx+1))
      printf "  [%s] segment %d/%d\r" "$out" "$idx" "$((ROTATIONS*NCLIPS))"
    done
  done
  echo

  ffmpeg -nostdin -loglevel error -y -f concat -safe 0 -i "$list" -c copy "$OUT_DIR/$out"
  rm -rf "$tmp"
}

# 16:9 header: source is already ~16:9, just normalize to 1920x1080.
echo "Rendering header (16:9)..."
render "rubbrband-header.webm" \
  "scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080"

# 9:16 index card: center-crop to 9:16 then scale to 720x1280.
echo "Rendering card (9:16)..."
render "home-card-rubbrband.webm" \
  "crop=ih*9/16:ih,scale=720:1280"

echo "Done:"
ls -la "$OUT_DIR/rubbrband-header.webm" "$OUT_DIR/home-card-rubbrband.webm"
