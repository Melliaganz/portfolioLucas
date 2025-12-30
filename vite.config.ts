import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js"; // Importe le plugin

export default defineConfig({
  plugins: [
    react(),
    cssInjectedByJsPlugin(), // Ajoute-le à la liste des plugins
  ],
  define: {
    __APP_YEAR__: JSON.stringify(new Date().getFullYear()),
  },
  build: {
    cssMinify: 'esbuild', 
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) {
            return 'react-core';
          }
          if (id.includes('node_modules/react-icons')) {
            return 'ui-icons';
          }
        }
      }
    },
    chunkSizeWarningLimit: 600,
  }
});
