import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    assetsInlineLimit: 30000,
    rollupOptions: {
      output: {
        manualChunks: () => "index",
      },
    },
  },
});
