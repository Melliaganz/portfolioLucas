import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// 1. REMOVED: cssInjectedByJsPlugin

export default defineConfig({
  plugins: [react()],
  build: {
    cssCodeSplit: true,
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom'],
        },
      },
    },
  },
});
