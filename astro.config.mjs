import { defineConfig } from "astro/config";

export default defineConfig({
  // Match WordPress-style URLs for SEO parity: /pricing/ not /pricing
  trailingSlash: "always",
  // Output directories so routes build as /pricing/index.html etc.
  build: { format: "directory" },
});
