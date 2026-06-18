#!/usr/bin/env bash
# build_flat_review.sh - copy every source file into ONE flat folder (no subdirs)
# for drag-and-drop into ChatGPT. Nested files are prefixed with their origin folder
# (api_, data_, scripts_, tests_) so nothing collides and structure stays obvious.
#
# Run from site/:  bash scripts/build_flat_review.sh
set -euo pipefail
cd "$(dirname "$0")/.."

OUT="ChatGPT_Review_Flat"
rm -rf "$OUT"
mkdir -p "$OUT"

# root-level files (keep names as-is)
for f in index.html styles.css app.js data.js scoring.js apiutil.js \
         package.json vercel.json README.md DEMO_SCRIPT.md CLAIM_MATRIX.md DEPLOY.md \
         FRONTEND_REVIEW_BUNDLE.md; do
  [ -f "$f" ] && cp "$f" "$OUT/$f"
done

# nested files (prefix with folder so the flat dir has no subfolders)
for f in api/*.js;     do [ -f "$f" ] && cp "$f" "$OUT/api_$(basename "$f")"; done
for f in data/*.csv;   do [ -f "$f" ] && cp "$f" "$OUT/data_$(basename "$f")"; done
for f in scripts/*.py; do [ -f "$f" ] && cp "$f" "$OUT/scripts_$(basename "$f")"; done
for f in scripts/*.sh; do [ -f "$f" ] && cp "$f" "$OUT/scripts_$(basename "$f")"; done
for f in tests/*.js;   do [ -f "$f" ] && cp "$f" "$OUT/tests_$(basename "$f")"; done

COUNT=$(find "$OUT" -maxdepth 1 -type f | wc -l | tr -d ' ')
SUBDIRS=$(find "$OUT" -mindepth 1 -type d | wc -l | tr -d ' ')
echo "Built $OUT/ - $COUNT files, $SUBDIRS subfolders"
ls -1 "$OUT"
