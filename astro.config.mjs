import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://jenshawgonutrition.com",
  vite: {
    resolve: {
      alias: {
        "@": "/src",
      },
    },
  },
});
