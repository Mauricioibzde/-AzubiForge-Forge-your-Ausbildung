import { defineConfig } from "vite";

export default defineConfig({
  // Relative base keeps assets working on GitHub project Pages
  // (e.g. /repo-name/) and on local preview.
  base: "./",
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
