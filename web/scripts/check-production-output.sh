#!/usr/bin/env sh
set -eu

output_dir="${1:-public}"

if [ ! -d "$output_dir" ]; then
  echo "Production output directory does not exist: $output_dir" >&2
  exit 1
fi

blocked_pattern='localhost|127\.0\.0\.1|http://specdd\.ai|https?://[^[:space:]"'"'"'<>]*\.pages\.dev'

if grep -RInE -- "$blocked_pattern" "$output_dir"; then
  echo "Production output contains non-production or non-canonical URLs." >&2
  exit 1
fi
