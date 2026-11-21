import type { Localized } from '@/i18n/LanguageContext'

export type { Lang, Localized } from '@/i18n/LanguageContext'

/** Gallery categories. Use 'Uncategorized' when unsure. */
export type Category = 'Calligraphy' | 'Painting' | 'Drawing' | 'Handmade' | 'Uncategorized'

export type Availability = 'available' | 'sold' | 'commission'

export interface Artwork {
  /** Unique, stable identifier. */
  id: string
  /** URL part of the detail page: /gallery/<slug>. */
  slug: string
  /** Full-size image under /public, e.g. "/images/artworks/echoes-of-eternity.webp". */
  image: string
  /** Smaller version for grids (optional; falls back to `image`). */
  thumbnail?: string
  /** Pixel size of `image`; sets the shape the piece is shown at. */
  width: number
  height: number
  /** Dominant colour, shown while the image loads. */
  color?: string
  /** Original filename in the artwork folder, for your reference. Not shown on the site. */
  sourceFile?: string
  title: Localized
  category: Category
  description: Localized
  /** Show on the homepage (the first featured work also appears in the hero). */
  featured: boolean

  // Optional details — leave out anything you don't want to show yet.
  availability?: Availability
  year?: number
  medium?: Localized
  /** Physical size, e.g. "50 × 70 cm". */
  dimensions?: string
  price?: Localized
}
