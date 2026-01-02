import { defineConfig, mergeConfig } from "vite";
import { defineConfig as defineVitestConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import Sitemap from 'vite-plugin-sitemap';
import { viteSingleFile } from "vite-plugin-singlefile";

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
    // Ce plugin va inclure votre JS directement dans l'index.html
    viteSingleFile(),
  ],
  define: {
    __APP_YEAR__: JSON.stringify(new Date().getFullYear()),
  },
  resolve: {
    alias: {
      "@vercel/speed-insights/next": "@vercel/speed-insights/react",
      "react": "preact/compat",
      "react-dom/test-utils": "preact/test-utils",
      "react-dom": "preact/compat",
      "react/jsx-runtime": "preact/jsx-runtime",
    },
  },
  build: {
    cssMinify: 'esbuild', 
    rollupOptions: {
      output: {
        manualChunks: undefined, // On désactive les chunks pour tout mettre dans le HTML
      }
    },
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
