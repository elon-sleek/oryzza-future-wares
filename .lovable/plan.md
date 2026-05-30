## Goal

Produce a folder of plain HTML/CSS/JS/image files you can upload to the new domain's `public_html` on cPanel. No design changes, no code rewrite.

## Why this works

Your site has no backend behavior — no database queries, no forms posting to a server, no logins. It's purely presentational. TanStack Start can prerender the home route to a static `index.html` plus hashed asset files, which is exactly what cPanel shared hosting serves best.

## Steps

1. **Enable prerendering for `/`** in `vite.config.ts` (TanStack Start's `prerender` option) so the build emits a real `index.html` at the root instead of a server entry.
2. **Run the production build.** Output goes to `dist/` (or `.output/public/` depending on the adapter — I'll confirm during build).
3. **Verify the output folder** contains:
   - `index.html`
   - `assets/` (hashed JS, CSS, images)
   - favicon and any referenced public files
   - No `server.js` / Worker bundle needed for upload
4. **Provide upload instructions** for cPanel:
   - Log in to cPanel → File Manager → navigate to the new domain's document root (cPanel usually creates `public_html/<addon-domain-folder>/` for an addon domain, or it's a separate `public_html` if it's a primary domain on a separate cPanel account — I'll give both paths).
   - Upload the contents of the build folder (not the folder itself) — `index.html` must sit at the document root.
   - Optionally add a small `.htaccess` for clean caching headers and gzip.

## Technical details

- `vite.config.ts`: add `tanstackStart({ prerender: { enabled: true, crawlLinks: true } })` (or equivalent for the installed version) so `/` is rendered to HTML at build time.
- Confirm no route uses a server function or `createServerFn` — current `src/routes/index.tsx` is pure React, so this is safe.
- Asset paths stay relative to root, which works on any domain pointed at the upload folder.
- No `.env` or secrets shipped — there aren't any in use.

## What you'll do after I build

1. I'll tell you the exact local folder to download (e.g. `dist/`).
2. In cPanel: File Manager → your new domain's document root → Upload → drag all files in.
3. Visit the domain — site loads as-is.

## Out of scope

- No migration to a different framework.
- No visual changes.
- No backend, forms-to-email, or CMS wiring (can be added later if you want a working contact form — cPanel can do that with a small PHP script).