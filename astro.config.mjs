import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import vercel from "@astrojs/vercel";

export default defineConfig({
  output: "static",
  image: {
    domains: ["img.lsvn.vn"],
  },
  adapter: vercel({
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
      proxy: {
        "/api/chat": {
          target: "http://127.0.0.1:8787",
          changeOrigin: true,
        },
      },
    },
  },
  compressHTML: true,
  build: {
    inlineStylesheets: "always",
  },
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "hover",
  },
});
