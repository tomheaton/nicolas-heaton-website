// @ts-check
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, fontProviders } from "astro/config";

export default defineConfig({
  site: "https://nicolasheaton.uk",
  fonts: [
    {
      provider: fontProviders.google(),
      name: "Outfit",
      cssVariable: "--font-outfit",
      weights: [300, 400, 500, 600, 700, 800],
      subsets: ["latin"],
    },
    {
      provider: fontProviders.google(),
      name: "Syne",
      cssVariable: "--font-syne",
      weights: [700],
      subsets: ["latin"],
    },
  ],
  integrations: [sitemap()],
  vite: { plugins: [tailwindcss()] },
});
