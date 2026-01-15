import { defineConfig, mergeConfig } from "vite";
import { defineConfig as defineVitestConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import Sitemap from 'vite-plugin-sitemap';
import { viteSingleFile } from "vite-plugin-singlefile";

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
    ...(!isVitest ? [viteSingleFile()] : []),
  ],
  define: {
    __APP_YEAR__: JSON.stringify(new Date().getFullYear()),
  },
  resolve: {
    alias: {
      "@vercel/speed-insights/next": "@vercel/speed-insights/react",
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
        // En mode PnP, les chemins ne contiennent plus "node_modules". 
        // Si vous utilisez vite-plugin-singlefile, manualChunks n'est de toute façon pas utilisé.
        manualChunks: undefined 
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
    // Correction pour Yarn PnP sur Linux/GitHub Actions :
    pool: 'threads',
    poolOptions: {
      threads: {
        singleThread: true,
      },
    },
  },
});

export default mergeConfig(viteConfig, vitestConfig);
