// Builds the demo site into _site/, the way GitHub Pages publishes it:
//   /          the start page (site/index.html): the demo explained, with the app and the admin panel side by side
//   /app/      the member app, exported for the web
//   /admin/    the studio's admin panel
//   /hulp/     the help page with the explainer video, once it is in site/hulp/
//   /404.html  the app again: GitHub Pages answers unknown addresses with it, so a link to a screen opens that screen
// Everything in site/ is copied over as is.
// Usage: node scripts/build-site.mjs [base path], by default /blanche-beauty-demo
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

process.chdir(fileURLToPath(new URL('..', import.meta.url)));
const base = (process.argv[2] ?? '/blanche-beauty-demo').replace(/\/$/, '');
const run = (command, cwd, env = {}) => execSync(command, { cwd, stdio: 'inherit', env: { ...process.env, ...env } });

fs.rmSync('_site', { recursive: true, force: true });
run('npx expo export --platform web --output-dir ../../_site/app', 'apps/app', { EXPO_BASE_URL: `${base}/app` });
run(`npx vite build --base=${base}/admin/ --outDir ../../_site/admin --emptyOutDir`, 'apps/admin');
fs.cpSync('site', '_site', { recursive: true });
// The start page shows three photos of Blanche's own work.
fs.mkdirSync('_site/photos', { recursive: true });
for (const photo of ['nails-red', 'lashes-lift', 'brows-map']) {
  fs.copyFileSync(`apps/app/assets/photos/${photo}.jpg`, `_site/photos/${photo}.jpg`);
}

// The demo uses fictional data, so the app stays out of search results; white from the very first moment.
const page = '_site/app/index.html';
const html = fs
  .readFileSync(page, 'utf8')
  .replace('<head>', '<head><meta name="robots" content="noindex, nofollow" />')
  .replace('</head>', '<style>html,body{background:#FFFFFF}</style></head>');
fs.writeFileSync(page, html);
fs.copyFileSync(page, '_site/404.html');
fs.writeFileSync('_site/.nojekyll', '');
console.log(`Built _site/ for ${base}/`);
