# Mahta Art Studio — website

The portfolio site for Mahta Art Studio: original artwork, calligraphy, paintings and commissions. Built with **React + Vite + TypeScript**, Tailwind CSS, React Router, Motion for React, Lucide icons, React Hook Form and Zod.

## Commands

```bash
npm install       # install dependencies
npm start         # start the dev server (http://localhost:5173)
npm run dev       # same as npm start
npm run build     # type-check and build to /dist
npm run preview   # serve the production build locally
```

## Pages

| Route           | Page                                                        |
| --------------- | ----------------------------------------------------------- |
| `/`             | Home — hero, featured works, philosophy, commission process |
| `/gallery`      | Gallery — filter by script and availability, plus search    |
| `/gallery/:slug`| Artwork detail — specs, full-screen view, prev/next, related|
| `/about`        | Artist bio, timeline, studio materials                      |
| `/contact`      | General enquiry and commission request forms                |

## Editing content

- **Artworks:** `src/data/artworks.ts` lists every artwork, in gallery order. See "Adding artwork" below.
  - Fill in or change `title`, `description`, `category` and `featured`. The optional fields `year`, `medium`, `dimensions` (e.g. `'50 × 70 cm'`), `availability` (`'available'`, `'sold'` or `'commission'`) and `price` are shown only once you add them.
  - The availability filter in the gallery appears automatically once at least one artwork has `availability`.
  - Category filters appear for each category that has artwork: `Calligraphy`, `Painting`, `Drawing`, `Handmade` or `Uncategorized`.
  - Featured works appear on the homepage. The first featured work is also the large piece in the hero.
- **Studio details, bio, timeline, materials, process:** `src/data/siteConfig.ts`.
  - Portrait goes in `public/images/artist/`, studio photo in `public/images/studio/`. Set `artist.portrait` / `artist.studio` to point at them.
- **Colours and fonts:** the `@theme` block in `src/index.css`.

> The bio, timeline, email address, location and social links are placeholders. Replace them with your real details before you publish.

## Adding artwork

1. Run the import script with the path to one or more photos. Add `=Title` to set a title:

   ```bash
   npm run import-artwork -- "C:\Users\mahta\OneDrive\کالیگرافی\archivedwl-73\New Piece.jpg" "C:\path\photo_2024.jpg=Untitled VI"
   ```

   The script:
   - only **reads** your originals and never moves, renames or changes them,
   - skips any photo that was already imported (it compares file contents, not names),
   - saves an optimized `.webp` in `public/images/artworks/`, plus a smaller thumbnail for large photos,
   - prints a ready-made entry for each new artwork.
2. Paste the printed entries into the `artworks` list in `src/data/artworks.ts`, then set the title, category, description and anything else you want to show.

`public/images/artworks/manifest.json` records which original file each website image came from.

Tips:
- Use straight-on photos of the artwork itself. Room mockups make the artwork small and angled.
- The site never crops or stretches images. If a photo includes wall or background around the artwork, crop it in a photo editor first (keep the original), then import the cropped copy.

## Light and dark mode

The site opens in **light mode**. Visitors can switch with the sun/moon button in the header, and the site remembers their choice.

- Theme colours are defined in `src/index.css`: dark values in `@theme`, light values in the `:root:not([data-theme='dark'])` block.
- A section can keep the same look in both themes by adding `data-theme="light"` or `data-theme="dark"` to it. The beige Philosophy and Materials sections are always light; the green commission band is always dark.

## Logo

The header and footer use your original logo artwork, prepared by:

```bash
node scripts/process-logo.mjs "C:\path\to\Mahta Persian-Inspired Art Studio Logo.png"
```

It writes to `public/images/`:
- `mahta-logo-original.png`: an untouched backup of your file.
- `mahta-logo.webp` / `.png`: the paper background made transparent and the empty margin trimmed, in the original colours (used in light mode).
- `mahta-logo-light.webp`: the same artwork in light ivory (used in dark mode).

No lettering is redrawn or cropped. To use a new logo version, run the script again with the new file.

## Languages (English / Danish)

The site is fully bilingual. Visitors switch with the **EN / DA** toggle in the header.

- **First visit:** the site opens in Danish if the visitor's browser language is Danish, and in English otherwise. After that it remembers each visitor's choice.
- **Interface text** (menus, buttons, headings, form labels, error messages) lives in `src/i18n/en.ts` and `src/i18n/da.ts`. TypeScript checks that both files have the same keys, so a missing translation fails the build.
- **Content** (artworks, bio, timeline, materials, process) has an `en` and a `da` version of each text in `src/data/artworks.ts` and `src/data/siteConfig.ts`.
- **Adding a language:** add a dictionary file, add the code to `languages` in `src/i18n/LanguageContext.tsx`, and add that language's version of each content text.

Both languages use the same URLs. The page's `lang` attribute and title update when the visitor switches.

## Contact forms — how they actually send

The forms validate input with Zod. Where the message goes depends on configuration:

1. **No backend configured (default):** submitting opens the visitor's email app with the message already filled in and addressed to `siteConfig.email`. The site never says a message was "sent" in this mode; it tells the visitor to press Send in their email app.
2. **With a form service:** create a form at a service such as [Formspree](https://formspree.io), copy `.env.example` to `.env`, and set:

   ```
   VITE_FORM_ENDPOINT=https://formspree.io/f/your-id
   ```

   The forms then POST JSON to that endpoint and show a real confirmation.

A form endpoint URL is public by design, so it's safe in a `VITE_` variable. **Never put API keys or secrets in `VITE_*` variables.** Vite bundles them into the browser code. If you need something like Resend or SendGrid, call it from a serverless function (Vercel / Netlify Functions, Supabase Edge Functions) and keep the key on the server.

A hidden honeypot field filters out basic spam bots.

## Deployment

This is a single-page app, so every route has to serve `index.html`:

- **Vercel:** `vercel.json` is already included.
- **Netlify:** `public/_redirects` is already included.

Build command: `npm run build` · output directory: `dist`.

## Google Tag Manager

The container is `GTM-MV6HT96T`. Google's Tag Manager code is at the top of `<head>` and `<body>` in `index.html`. The same ID is set as `tagManagerId` in `src/data/siteConfig.ts`, which turns on the page-change events below. To change containers, update all three places.

- Tag Manager loads on every page.
- The site changes pages without reloading, so it sends a `virtual_page_view` event each time the visitor opens another page, with `page_path`, `page_location` and `page_title`. In Tag Manager, use a **Custom Event** trigger named `virtual_page_view` for tags that should fire on every page. Google Analytics 4 can also track these page changes by itself ("Page changes based on browser history events" in its enhanced measurement settings). Use one or the other, not both, or page views are counted twice.
- **Cookie consent:** visitors in Denmark and the EU must agree before analytics or marketing cookies are set. Add a consent banner through Tag Manager (for example the Cookiebot or CookieYes template) before you publish tags that use cookies.
