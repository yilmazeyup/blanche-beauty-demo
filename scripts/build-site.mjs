// Builds the demo site into _site/, the way GitHub Pages publishes it:
//   /          the member app, exported for the web
//   /404.html  the same app: GitHub Pages answers unknown addresses with it, so a link to a screen opens that screen
//   /admin/    the studio's admin panel
// Anything in site/ (such as a help page in site/hulp/) is copied over as is.
// Usage: node scripts/build-site.mjs [base path], by default /blanche-beauty-demo
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

process.chdir(fileURLToPath(new URL('..', import.meta.url)));
const base = (process.argv[2] ?? '/blanche-beauty-demo').replace(/\/$/, '');
const run = (command, cwd, env = {}) => execSync(command, { cwd, stdio: 'inherit', env: { ...process.env, ...env } });

fs.rmSync('_site', { recursive: true, force: true });
run('npx expo export --platform web --output-dir ../../_site', 'apps/app', { EXPO_BASE_URL: base });
run(`npx vite build --base=${base}/admin/ --outDir ../../_site/admin --emptyOutDir`, 'apps/admin');
if (fs.existsSync('site')) fs.cpSync('site', '_site', { recursive: true });

// The demo uses fictional data, so it stays out of search results; white from the very first moment.
const page = '_site/index.html';
const html = fs
  .readFileSync(page, 'utf8')
  .replace('<head>', '<head><meta name="robots" content="noindex, nofollow" />')
  .replace('</head>', '<style>html,body{background:#FFFFFF}</style></head>');
fs.writeFileSync(page, html);
fs.copyFileSync(page, '_site/404.html');
fs.writeFileSync('_site/.nojekyll', '');
console.log(`Built _site/ for ${base}/`);
