# App assets

This folder no longer ships bundled static assets. All asset URLs are resolved
at runtime through a single helper in
[`src/components/home/media.tsx`](../../src/components/home/media.tsx).

## How asset URLs are built

Every asset (icon, banner, illustration, etc.) is stored as a **relative path**
and resolved against a configurable base:

```
asset('icons/ico_home.svg')
  // base unset → /assets/icons/ico_home.svg   (this empty folder)
  // base set   → <VITE_ASSET_BASE_URL>/icons/ico_home.svg
```

Set the base in a `.env` file (see [`.env.example`](../../.env.example)):

```
VITE_ASSET_BASE_URL=https://your-cdn.com/app-assets
```

## Current behaviour (no base set, no files here)

Because this folder is empty and no `VITE_ASSET_BASE_URL` is configured:

- **Images** (`AssetImg`) render their styled fallbacks (gradient blocks / emoji).
- **Icons** (`MaskIcon`) degrade to empty space (no broken squares).

To restore real visuals, either:

1. Point `VITE_ASSET_BASE_URL` at a CDN / asset server that hosts the files, **or**
2. Drop the files back into this folder under `icons/`, `banners/`,
   `illustrations/`, `discover/` (paths are listed in `media.tsx`).

## Expected relative paths

`media.tsx` references these keys (relative to the asset base):

- `icons/ico_*.svg` — single-path SVGs (tinted via CSS mask)
- `banners/*.png` — promo / product banners (incl. `1.png`, `2.png`, `3.png`)
- `illustrations/*` — apply-loan illustrations, avatar orb
- `discover/calculator.png`
