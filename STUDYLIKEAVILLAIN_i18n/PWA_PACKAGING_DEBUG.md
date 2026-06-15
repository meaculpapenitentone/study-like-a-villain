# PWA Packaging Debug

This is the production PWA build for Microsoft Store packaging.

## Current production settings

- `manifest.json` includes complete production metadata.
- `screenshots` are enabled in the manifest.
- Manifest icons use PNG files only:
  - `icons/icon-192.png`
  - `icons/icon-512.png`
- `service-worker.js` cache version:
  - `study-like-a-villain-v22`
- The service worker precaches essential assets with `cache.addAll`.
- Optional i18n, quote, and screenshot assets use `Promise.allSettled` so they cannot break installation.
- The service worker ignores non-GET and cross-origin requests.
- All PWA paths are relative for GitHub Pages compatibility.

## URLs to test after deploy

- App: https://meaculpapenitentone.github.io/study-like-a-villain/
- Manifest: https://meaculpapenitentone.github.io/study-like-a-villain/manifest.json
- 192 icon: https://meaculpapenitentone.github.io/study-like-a-villain/icons/icon-192.png
- 512 icon: https://meaculpapenitentone.github.io/study-like-a-villain/icons/icon-512.png
- Home screenshot: https://meaculpapenitentone.github.io/study-like-a-villain/screenshots/home-desktop.png
- Timer screenshot: https://meaculpapenitentone.github.io/study-like-a-villain/screenshots/timer-desktop.png
- Tutorial screenshot: https://meaculpapenitentone.github.io/study-like-a-villain/screenshots/tutorial-desktop.png
- Service worker: https://meaculpapenitentone.github.io/study-like-a-villain/service-worker.js

## PWABuilder retry steps

1. Deploy this build to GitHub Pages.
2. Confirm the URLs above return `200`.
3. Open the app once in an incognito/private window.
4. Run PWABuilder with:
   `https://meaculpapenitentone.github.io/study-like-a-villain/`
5. If PWABuilder still hangs, clear PWABuilder site data and retry package generation.
