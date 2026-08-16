# nicolas-heaton-website

A website for Nicolas Heaton Hairdresser.

Astro 7 + Tailwind v4, deployed on Vercel at [nicolasheaton.uk](https://nicolasheaton.uk).

## Commands

| Command          | Action                                |
| ---------------- | ------------------------------------- |
| `pnpm dev`       | Start local dev server                |
| `pnpm build`     | Build the static site to `dist/`      |
| `pnpm preview`   | Preview the production build locally  |
| `pnpm lint`      | Check code with Biome                 |
| `pnpm lint:fix`  | Auto-fix with Biome                   |
| `pnpm typecheck` | Run `astro check`                     |
| `pnpm unused`    | Find unused code with knip            |

## Assets

Raster exports (`public/logo.png`, `public/monogram.png`) and the favicon are generated
from the SVGs in `resources/`. Regenerate them after changing the logo with:

```sh
node scripts/generate-assets.mjs
```
