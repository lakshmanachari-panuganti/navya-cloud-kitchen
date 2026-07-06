# Visual screenshots

Playwright captures full-page screenshots of every primary route in
both desktop and mobile viewports.

## Run

```bash
cd frontend
npm run screenshots            # both viewports
npm run screenshots:desktop    # desktop only
npm run screenshots:mobile     # mobile only
```

Playwright starts a local `http-server` on port 8123, drives Chromium,
and writes PNGs to `tests/screenshots/{desktop,mobile}/…`.

## Output layout

```
tests/screenshots/
  desktop/
    home.png
    home--nav-scrolled.png
    policies.png
    products/<slug>.png
    blog/<slug>.png
  mobile/
    home.png
    home--menu-open.png
    home--menu-products-open.png
    policies.png
    products/<slug>.png
    blog/<slug>.png
```

Outputs are gitignored; regenerate any time with the command above.

## Adding a new route

Edit the `PAGES` array in `screenshots.spec.js` — one entry per route
with `{ slug, path }`. `slug` becomes the file name under both
viewport folders.
