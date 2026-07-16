import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import vercel from "@astrojs/vercel";

export default defineConfig({
  output: "static",
  adapter: vercel({
    webAnalytics: { enabled: true },
    imageService: true,
    imagesConfig: {
      sizes: [320, 640, 768, 1024, 1280, 1536],
      formats: ["image/avif", "image/webp"],
    },
  }),
  vite: {
    plugins: [tailwindcss()],
    build: {
      cssCodeSplit: true,
      minify: "esbuild",
    },
    server: {
      watch: {
        ignored: ["!**/src/data/**"],
      },
    },
  },
  compressHTML: true,
  build: {
    inlineStylesheets: "auto",
  },
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "hover",
  },
});
