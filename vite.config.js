
import { defineConfig } from "vite";
import { resolve } from "node:path";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(process.cwd(), "index.html"),
        explore: resolve(process.cwd(), "explore.html"),
        culture: resolve(process.cwd(), "culture.html"),
        about: resolve(process.cwd(), "about.html"),
        favorites: resolve(process.cwd(), "favorites.html"),
        record: resolve(process.cwd(), "record.html"),
      },
    },
  },
});
