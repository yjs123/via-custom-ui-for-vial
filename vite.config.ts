import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  // ✅ 改这里：自定义域名用根路径
  base: process.env.TAURI_ENV_PLATFORM === undefined ? "/" : "./",
  define: {
    "process.env": {},
  },
  resolve: {
    alias: {
      os: path.resolve(__dirname, "src/shims/os.js"),
      hjson: path.resolve(__dirname, "node_modules/hjson/bundle/hjson.js"),
      webRawHID:
        process.env.TAURI_ENV_PLATFORM === undefined
          ? path.resolve(__dirname, "src/services/platform/web/webRawHID.ts")
          : path.resolve(__dirname, "src/services/platform/tauri/rawHID.ts"),
    },
  },
  clearScreen: false,
  server: {
    strictPort: true,
    watch: {
      ignored: ["**/src-tauri/**"],
    },
  },
  envPrefix: [
    "VITE_",
    "TAURI_ENV_PLATFORM",
    "TAURI_ENV_ARCH",
    "TAURI_ENV_FAMILY",
    "TAURI_ENV_PLATFORM_VERSION",
    "TAURI_ENV_PLATFORM_TYPE",
    "TAURI_ENV_DEBUG",
  ],
  build:
    process.env.TAURI_PLATFORM === undefined
      ? undefined
      : {
          target: process.env.TAURI_ENV_PLATFORM == "windows" ? "chrome105" : "safari13",
          minify: !process.env.TAURI_ENV_DEBUG ? "esbuild" : false,
          sourcemap: !!process.env.TAURI_ENV_DEBUG,
        },
});