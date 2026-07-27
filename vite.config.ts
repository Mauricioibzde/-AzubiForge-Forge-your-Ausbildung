import { defineConfig } from "vite";

export default defineConfig({
  build: {
    chunkSizeWarningLimit: 700
  },
  server: {
    port: 5174,
    strictPort: false
  },
  preview: {
    port: 4174
  }
});
