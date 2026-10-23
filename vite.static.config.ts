import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
// Static build for GitHub Pages (no server functions / auth / DB).
export default defineConfig({
  base: process.env.BASE_PATH ?? "/",
  resolve: { tsconfigPaths: true },
  plugins: [
    tailwindcss(),
    tanstackStart({ prerender: {
        enabled: true,
        crawlLinks: true,
        // Only prerender pages; never re-render file links (e.g. the .jpg 圖卡 download), which corrupts them.
        filter: ({ path }: { path: string }) => !/\.[a-z0-9]{2,5}$/i.test(path.split(/[?#]/)[0]),
      } }),
    viteReact(),
  ],
});
