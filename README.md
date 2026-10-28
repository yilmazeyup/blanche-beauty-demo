# Blanche Beauty — demo

A member app and an admin panel for **Blanche Beauty**, the nails, lashes and brows studio in Nijmegen (Korean lash
lifts also in Uden). This is a demo with test data only: fictional stylists and clients, and no real payments.

- Live demo: https://yilmazeyup.github.io/blanche-beauty-demo/ (a start page with the app and the admin panel side by
  side, in Dutch, English, Arabic, French, German and Italian)
- Member app: https://yilmazeyup.github.io/blanche-beauty-demo/app/
- Admin panel: https://yilmazeyup.github.io/blanche-beauty-demo/admin/ (`?at=2026-10-28T14:20` sets the demo clock)
- Help page with a Dutch explainer video (subtitles in Dutch and English) and common questions in six languages:
  https://yilmazeyup.github.io/blanche-beauty-demo/hulp/

## What's in it

**Member app:** Blanche's menu and prices, booking with a stylist and a time in Nijmegen (lash lifts also in Uden), a
pass with a QR code, a refill suggestion with the same stylist, a shade studio that paints the polish on a real hand,
swipeable inspiration and stories, Blanche Club points and rewards, deals and passes, aftercare products, gift cards
and contact.

**Admin panel:** the studio live in 3D (the stylists at their tables, clients in the chair and on the lash bed,
payments flying to the desk), client cards with past sets, colours and notes, the agenda per stylist, refill
reminders, the week's revenue, the shop and Instagram. "Speel de dag af" replays the day.

The look is Blanche's own: white with the logo's black script, cherry for nails, lilac for lashes, honey for brows,
Pinyon Script, Instrument Serif and Bricolage Grotesque.

## Real and demo

The treatments, prices, addresses and Nijmegen opening hours are Blanche's own (blanchebeauty.nl, October 2026), and
so are the photos of their work; the other photos are stock photos. The stylists, clients, Blanche Club, deals,
passes, shop products and the lash-lift day in Uden are demo values.

## Structure

```
apps/app/          the member app (Expo SDK 58, Expo Router), also exported for the web
apps/admin/        the admin panel (Vite, React, Three.js)
packages/shared/   languages (nl, en, ar, fr, de, it), formatting, and the studio's data and texts
site/              the demo site's start page (and its help page, in site/hulp/)
scripts/           builds and serves the demo site the way GitHub Pages publishes it
```

## Run

```bash
npm install
npm run web
```

The app opens on http://localhost:8091; `npm run app` starts Expo for Expo Go or the iOS simulator.

The admin panel has its own install, outside the npm workspaces: npm 10 crashes while resolving Vite 8's optional peer
dependencies inside the workspace, so `apps/admin/.npmrc` turns automatic peer installs off and `@blanche/shared` is
linked with `file:`.

```bash
npm --prefix apps/admin install
npm run admin
```

It opens on http://localhost:5182. `npm run typecheck` checks both.

## The demo site

`npm run site` builds what GitHub Pages publishes into `_site/`: the start page from `site/index.html` at `/`, the app
at `/app/`, the admin panel at `/admin/`, and a copy of the app as `404.html`, so a link straight to a screen opens the
app on that screen. Everything else in `site/` is copied over as is, such as a help page in `site/hulp/`; the start
page links to it as soon as it is published. `npm run site:serve` then serves the result on
http://localhost:8099/blanche-beauty-demo/, the way GitHub Pages does.

Every push to `main` builds the site and publishes it (`.github/workflows/pages.yml`).

## Languages

Dutch is the source language. The app's texts live in `packages/shared/src/i18n/`, the panel's in
`apps/admin/src/i18n/`; every language file must provide the same keys as its `nl.ts`. In the app, switch language
under Instellingen; on the web, `?lang=ar` opens the demo in that language and `?intro=0` skips the opening animation.

## Photos

Sources are listed in `apps/app/assets/photos/CREDITS.md`.
