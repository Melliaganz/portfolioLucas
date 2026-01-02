import { defineConfig, mergeConfig } from "vite";
import { defineConfig as defineVitestConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import Sitemap from 'vite-plugin-sitemap';

// Détection de l'environnement Vitest
const isVitest = process.env.VITEST === "true";

const viteConfig = defineConfig({
  plugins: [
    react(),
    cssInjectedByJsPlugin(),
    Sitemap({ 
      hostname: 'https://www.lengrandlucas.com',
      readable: true,
      generateRobotsTxt: true,
      dynamicRoutes: ['/'],
    }),
  ],
  define: {
    __APP_YEAR__: JSON.stringify(new Date().getFullYear()),
  },
  resolve: {
    alias: {
      "@vercel/speed-insights/next": "@vercel/speed-insights/react",
      // On applique Preact uniquement si on n'est pas en mode test
      ...(!isVitest ? {
        "react": "preact/compat",
        "react-dom/test-utils": "preact/test-utils",
        "react-dom": "preact/compat",
        "react/jsx-runtime": "preact/jsx-runtime",
      } : {}),
    },
  },
  build: {
    modulePreload: {
      polyfill: false,
    },
    cssMinify: 'esbuild', 
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/preact/') || id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) {
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

const vitestConfig = defineVitestConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
  },
});

export default mergeConfig(viteConfig, vitestConfig);
