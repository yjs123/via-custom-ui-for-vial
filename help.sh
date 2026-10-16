#!/usr/bin/env bash

set -e

cd "$(dirname "$0")"
npx tauri build --no-bundle
npm run dev
# npx tauri dev