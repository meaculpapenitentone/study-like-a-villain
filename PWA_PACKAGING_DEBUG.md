# PWA Packaging Debug

This build was simplified for PWABuilder Windows/Microsoft Store packaging.

## What changed

- `manifest.json` was reduced to essential packaging fields only.
- The `screenshots` field remains removed because PWABuilder package analysis was hanging.
- Optional and experimental manifest fields are not present.
- Manifest icons were reduced to the required PNG icons:
  - `icons/icon-192.png`
  - `icons/icon-512.png`
- `service-worker.js` was updated to `study-like-a-villain-v21-packaging-minimal`.
- The service worker no longer precaches files during install.
- Existing caches are cleared during activate to remove older packaging-test caches.
- The service worker now ignores cross-origin requests.

## URLs to test

- App: https://meaculpapenitentone.github.io/study-like-a-villain/
- Manifest: https://meaculpapenitentone.github.io/study-like-a-villain/manifest.json
- 192 icon: https://meaculpapenitentone.github.io/study-like-a-villain/icons/icon-192.png
- 512 icon: https://meaculpapenitentone.github.io/study-like-a-villain/icons/icon-512.png
- Service worker: https://meaculpapenitentone.github.io/study-like-a-villain/service-worker.js

## PWABuilder retry steps

1. Deploy this build to GitHub Pages.
2. Open the app once in an incognito/private window.
3. Confirm the manifest and icon URLs above return `200`.
4. Run PWABuilder again with:
   `https://meaculpapenitentone.github.io/study-like-a-villain/`
5. If PWABuilder still hangs, try clearing the browser site data for PWABuilder and rerun package generation.
