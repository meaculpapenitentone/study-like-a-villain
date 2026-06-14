# Study Like a Villain

Static HTML/CSS/JavaScript Pomodoro app with external JSON translations.

## Run locally

Because translations are loaded with `fetch()` from `i18n/*.json`, open the app through a local server or HTTPS hosting. Do not use `file://`.

```bash
python -m http.server 8000
```

Then open:

```text
http://127.0.0.1:8000/
```

## PWA

The app includes the base files required for PWA packaging:

- `manifest.json`
- `service-worker.js`
- `icons/icon-192.png`
- `icons/icon-512.png`

The service worker precaches the HTML, CSS, manifest, all interface translation JSON files, all quote JSON files, and the app icons. Service workers require HTTPS in production, or `localhost`/`127.0.0.1` during local testing.

## i18n

The official translation sources are:

- `i18n/en.json`
- `i18n/pt-BR.json`
- `i18n/es.json`
- `i18n/fr.json`
- `i18n/de.json`
- `i18n/it.json`
- `i18n/ja.json`

The official quote sources are loaded separately:

- `i18n/quotes/en.json`
- `i18n/quotes/pt-BR.json`
- `i18n/quotes/es.json`
- `i18n/quotes/fr.json`
- `i18n/quotes/de.json`
- `i18n/quotes/it.json`
- `i18n/quotes/ja.json`

The original Portuguese quote list is also kept as a JavaScript backup in `PHILOSOPHER_QUOTES_OFICIAL_pt-BR.js`.

English (`en`) is the default language and global fallback. On startup, the app first checks the optional URL override, then the manually selected language saved in `localStorage` under `studyPomodoroLanguage`, then detects the browser language with `navigator.languages` first and `navigator.language` as fallback. Automatic language choices are not saved to `localStorage`.

The visual language selector lets the user choose:

- English
- Português
- Español
- Français
- Deutsch
- Italiano
- Japanese

Manual changes are saved to `studyPomodoroLanguage`.

For testing, use the optional URL override before saved or browser detection:

- `?lang=pt-BR`
- `?lang=en`
- `?lang=es`
- `?lang=fr`
- `?lang=de`
- `?lang=it`
- `?lang=ja`

Mapping:

- `pt*` -> `pt-BR`
- `es*` -> `es`
- `fr*` -> `fr`
- `de*` -> `de`
- `it*` -> `it`
- `ja*` or `jp*` -> `ja`
- `en*` -> `en`
- anything else -> `en`
