#!/usr/bin/env node
/**
 * Prepares the logo for the website from the original artwork file.
 *
 *   node scripts/process-logo.mjs "C:\path\to\Mahta Persian-Inspired Art Studio Logo.png"
 *
 * Writes to public/images/:
 *   mahta-logo-original.png  untouched copy of the original (backup)
 *   mahta-logo.webp          paper background made transparent, original ink colours, margins trimmed
 *   mahta-logo-light.webp    the same shapes in light ivory, for dark backgrounds
 *   mahta-logo.png           PNG of mahta-logo.webp, for places that need PNG
 *
 * Nothing is redrawn: every pixel keeps its position. Transparency comes from how much darker
 * each pixel is than the paper, so soft stroke edges stay soft. It then checks that the
 * transparent logo, placed back on the paper colour, matches the original.
 */
import sharp from 'sharp'
import { copyFileSync, mkdirSync } from 'node:fs'

const src = process.argv[2]
if (!src) {
  console.log('Usage: node scripts/process-logo.mjs "<logo file>"')
  process.exit(1)
}
const OUT = 'public/images'
mkdirSync(OUT, { recursive: true })
copyFileSync(src, `${OUT}/mahta-logo-original.png`)

const { data, info } = await sharp(src).removeAlpha().raw().toBuffer({ resolveWithObject: true })
const { width: W, height: H } = info
const lum = (i) => 0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2]
const median = (arr) => arr.sort((a, b) => a - b)[arr.length >> 1]

// Paper colour: median of a 12px border all around the image.
const border = [[], [], []]
for (let y = 0; y < H; y++)
  for (let x = 0; x < W; x++) {
    if (x > 12 && x < W - 12 && y > 12 && y < H - 12) continue
    const i = (y * W + x) * 3
    for (let c = 0; c < 3; c++) border[c].push(data[i + c])
  }
const paper = border.map(median)
const paperL = 0.2126 * paper[0] + 0.7152 * paper[1] + 0.0722 * paper[2]

// Ink colour: average of the darkest 2% of pixels.
const order = Array.from({ length: W * H }, (_, p) => p).sort((a, b) => lum(a * 3) - lum(b * 3))
const darkest = order.slice(0, Math.max(1, Math.floor(order.length * 0.02)))
const ink = [0, 1, 2].map((c) => darkest.reduce((s, p) => s + data[p * 3 + c], 0) / darkest.length)
const inkL = 0.2126 * ink[0] + 0.7152 * ink[1] + 0.0722 * ink[2]

// Paper texture varies slightly; anything within this fraction of the paper→ink range counts as paper.
const PAPER_TOLERANCE = 0.14
const alphaAt = (i) => {
  const d = (paperL - lum(i)) / (paperL - inkL)
  return Math.min(1, Math.max(0, (d - PAPER_TOLERANCE) / (1 - PAPER_TOLERANCE)))
}

// Bounding box of the artwork, plus a small margin.
let x0 = W, y0 = H, x1 = 0, y1 = 0
for (let y = 0; y < H; y++)
  for (let x = 0; x < W; x++)
    if (alphaAt((y * W + x) * 3) > 0.08) {
      if (x < x0) x0 = x
      if (x > x1) x1 = x
      if (y < y0) y0 = y
      if (y > y1) y1 = y
    }
const pad = Math.round(Math.max(x1 - x0, y1 - y0) * 0.02)
x0 = Math.max(0, x0 - pad); y0 = Math.max(0, y0 - pad)
x1 = Math.min(W - 1, x1 + pad); y1 = Math.min(H - 1, y1 + pad)
const cw = x1 - x0 + 1
const ch = y1 - y0 + 1

const dark = Buffer.alloc(cw * ch * 4)
const light = Buffer.alloc(cw * ch * 4)
const IVORY = [244, 236, 222]
let diffSum = 0
for (let y = 0; y < ch; y++)
  for (let x = 0; x < cw; x++) {
    const i = ((y + y0) * W + (x + x0)) * 3
    const o = (y * cw + x) * 4
    const a = alphaAt(i)
    // Recover the stroke colour from the paper blend; faint edge pixels take the ink colour.
    for (let c = 0; c < 3; c++) {
      const unmixed = a > 0.5 ? (data[i + c] - (1 - a) * paper[c]) / a : ink[c]
      dark[o + c] = Math.round(Math.min(255, Math.max(0, unmixed)))
      light[o + c] = IVORY[c]
    }
    dark[o + 3] = light[o + 3] = Math.round(a * 255)
    // Check: transparent logo composited on the paper colour vs. the original pixel.
    for (let c = 0; c < 3; c++) diffSum += Math.abs(a * dark[o + c] + (1 - a) * paper[c] - data[i + c])
  }

const raw = { raw: { width: cw, height: ch, channels: 4 } }
const LOGO_W = 1000
await sharp(dark, raw).resize({ width: LOGO_W }).webp({ quality: 92, alphaQuality: 100, effort: 6 }).toFile(`${OUT}/mahta-logo.webp`)
await sharp(dark, raw).resize({ width: LOGO_W }).png({ compressionLevel: 9 }).toFile(`${OUT}/mahta-logo.png`)
await sharp(light, raw).resize({ width: LOGO_W }).webp({ quality: 92, alphaQuality: 100, effort: 6 }).toFile(`${OUT}/mahta-logo-light.webp`)

const outH = Math.round((ch * LOGO_W) / cw)
console.log(`original ${W}×${H}; paper rgb(${paper.join(',')}); ink rgb(${ink.map(Math.round).join(',')})`)
console.log(`trimmed to ${cw}×${ch} at (${x0},${y0}); web logo ${LOGO_W}×${outH}`)
console.log(`round-trip check: mean difference ${(diffSum / (cw * ch * 3)).toFixed(2)} / 255 per channel`)
