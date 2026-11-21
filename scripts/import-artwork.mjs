#!/usr/bin/env node
/**
 * Imports artwork photos into the website.
 *
 *   npm run import-artwork -- "C:\path\to\photo.jpg" "C:\path\to\other.png=My Title"
 *
 * For each file it:
 *   - reads the original (never modifies, moves or renames it),
 *   - skips it if the exact same file was imported before (by content hash),
 *   - writes an optimized full-size WebP and a smaller thumbnail to public/images/artworks/,
 *   - prints a ready-to-paste entry for src/data/artworks.ts.
 *
 * Add "=Title" after a path to set the title; otherwise it comes from the filename,
 * and camera-style names (photo_2020-…, IMG_…, Screenshot…) become "Untitled".
 */
import sharp from 'sharp'
import { createHash } from 'node:crypto'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { basename, extname, join } from 'node:path'

const OUT_DIR = 'public/images/artworks'
const MANIFEST = join(OUT_DIR, 'manifest.json')
const FULL_MAX = 2400
const THUMB_MAX = 900

const args = process.argv.slice(2)
if (args.length === 0) {
  console.log('Usage: npm run import-artwork -- "<image path>[=Title]" ...')
  process.exit(1)
}

mkdirSync(OUT_DIR, { recursive: true })
/** slug -> { source, sha1 } */
const manifest = existsSync(MANIFEST) ? JSON.parse(readFileSync(MANIFEST, 'utf8')) : {}
const knownHashes = new Map(Object.entries(manifest).map(([slug, m]) => [m.sha1, slug]))

const slugify = (s) =>
  s
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'artwork'

const isCameraName = (name) => /^(photo|img|image|dsc|pxl|screenshot|whatsapp)[\s_-]?/i.test(name) || /^[0-9a-f_-]{16,}$/i.test(name)

const uniqueSlug = (base) => {
  let slug = base
  for (let n = 2; manifest[slug]; n++) slug = `${base}-${n}`
  return slug
}

const entries = []
for (const arg of args) {
  const eq = arg.lastIndexOf('=')
  const file = eq > 2 ? arg.slice(0, eq) : arg
  const givenTitle = eq > 2 ? arg.slice(eq + 1).trim() : ''

  if (!existsSync(file)) {
    console.warn(`SKIP  ${file} — file not found`)
    continue
  }
  if (!/\.(jpe?g|png|webp)$/i.test(file)) {
    console.warn(`SKIP  ${file} — not a JPG, PNG or WebP image`)
    continue
  }

  const buffer = readFileSync(file)
  const sha1 = createHash('sha1').update(buffer).digest('hex')
  if (knownHashes.has(sha1)) {
    console.warn(`SKIP  ${basename(file)} — already imported as "${knownHashes.get(sha1)}"`)
    continue
  }

  const name = basename(file, extname(file))
  const title = givenTitle || (isCameraName(name) ? 'Untitled' : name.replace(/[_-]+/g, ' ').trim())
  const slug = uniqueSlug(slugify(title))

  // Apply EXIF rotation once, then derive both sizes from the upright image.
  const upright = await sharp(buffer).rotate().toBuffer({ resolveWithObject: true })
  const { width, height } = upright.info

  await sharp(upright.data)
    .resize(FULL_MAX, FULL_MAX, { fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 88, effort: 6 })
    .toFile(join(OUT_DIR, `${slug}.webp`))
  // A thumbnail only helps when it is clearly smaller than the full image.
  const hasThumb = Math.max(width, height) > THUMB_MAX * 1.2
  if (hasThumb) {
    await sharp(upright.data)
      .resize(THUMB_MAX, THUMB_MAX, { fit: 'inside' })
      .webp({ quality: 82, effort: 6 })
      .toFile(join(OUT_DIR, `${slug}-thumb.webp`))
  }

  const { dominant } = await sharp(upright.data).stats()
  const color = '#' + [dominant.r, dominant.g, dominant.b].map((v) => v.toString(16).padStart(2, '0')).join('')

  const scale = Math.min(1, FULL_MAX / Math.max(width, height))
  const w = Math.round(width * scale)
  const h = Math.round(height * scale)

  manifest[slug] = { source: basename(file), sha1 }
  knownHashes.set(sha1, slug)
  entries.push({ slug, title, source: basename(file), w, h, color, hasThumb })
  console.log(`OK    ${basename(file)} -> ${OUT_DIR}/${slug}.webp (${w}×${h})`)
}

writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + '\n')

if (entries.length) {
  console.log('\n// Paste into the `artworks` array in src/data/artworks.ts, then fill in the details:\n')
  for (const e of entries) {
    console.log(`  {
    id: '${e.slug}',
    slug: '${e.slug}',
    image: '/images/artworks/${e.slug}.webp',${e.hasThumb ? `\n    thumbnail: '/images/artworks/${e.slug}-thumb.webp',` : ''}
    width: ${e.w},
    height: ${e.h},
    color: '${e.color}',
    sourceFile: '${e.source.replace(/'/g, "\\'")}',
    title: { en: '${e.title.replace(/'/g, "\\'")}', da: '${e.title.replace(/'/g, "\\'")}' },
    category: 'Uncategorized',
    description: { ...DESCRIPTION_PLACEHOLDER },
    featured: false,
  },`)
  }
}
