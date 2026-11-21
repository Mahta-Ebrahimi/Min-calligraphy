import type { Artwork, Category } from '@/types'

/** Temporary text for artworks without a description yet. Replace per artwork when ready. */
export const DESCRIPTION_PLACEHOLDER = {
  en: 'Description coming soon.',
  da: 'Beskrivelse følger snart.',
}

/**
 * The artworks shown on the site, in gallery order.
 *
 * Images live in /public/images/artworks and are created with:
 *   npm run import-artwork -- "C:\path\to\photo.jpg=Title"
 * which also prints a ready-to-paste entry for this list.
 *
 * Titles, descriptions and the optional fields (year, medium, dimensions,
 * availability, price) are yours to fill in — nothing here has been guessed.
 * "Untitled" works are named after the order of their photos; rename them freely.
 */
export const artworks: Artwork[] = [
  {
    id: 'echoes-of-eternity',
    slug: 'echoes-of-eternity',
    image: '/images/artworks/echoes-of-eternity.webp',
    width: 903,
    height: 906,
    color: '#181818',
    sourceFile: 'Echoes of Eternity.jpg',
    title: { en: 'Echoes of Eternity', da: 'Echoes of Eternity' },
    category: 'Calligraphy',
    description: { ...DESCRIPTION_PLACEHOLDER },
    featured: true,
  },
  {
    id: 'when-leaves-turn-golden',
    slug: 'when-leaves-turn-golden',
    image: '/images/artworks/when-leaves-turn-golden.webp',
    thumbnail: '/images/artworks/when-leaves-turn-golden-thumb.webp',
    width: 1151,
    height: 1130,
    color: '#383828',
    sourceFile: 'When Leaves Turn Golden.jpg',
    title: { en: 'When Leaves Turn Golden', da: 'When Leaves Turn Golden' },
    category: 'Calligraphy',
    description: { ...DESCRIPTION_PLACEHOLDER },
    featured: true,
  },
  {
    id: 'the-dance-of-infinity',
    slug: 'the-dance-of-infinity',
    image: '/images/artworks/the-dance-of-infinity.webp',
    width: 899,
    height: 878,
    color: '#d8d8c8',
    sourceFile: 'The Dance of Infinity.jpg',
    title: { en: 'The Dance of Infinity', da: 'The Dance of Infinity' },
    category: 'Calligraphy',
    description: { ...DESCRIPTION_PLACEHOLDER },
    featured: true,
  },
  {
    id: 'secrets-in-the-shadows',
    slug: 'secrets-in-the-shadows',
    image: '/images/artworks/secrets-in-the-shadows.webp',
    width: 811,
    height: 811,
    color: '#382818',
    sourceFile: 'Secrets in the Shadows.jpg',
    title: { en: 'Secrets in the Shadows', da: 'Secrets in the Shadows' },
    category: 'Calligraphy',
    description: { ...DESCRIPTION_PLACEHOLDER },
    featured: true,
  },
  {
    id: 'echoes-of-the-forest',
    slug: 'echoes-of-the-forest',
    image: '/images/artworks/echoes-of-the-forest.webp',
    thumbnail: '/images/artworks/echoes-of-the-forest-thumb.webp',
    width: 1205,
    height: 1223,
    color: '#282828',
    sourceFile: 'Echoes of the Forest.jpg',
    title: { en: 'Echoes of the Forest', da: 'Echoes of the Forest' },
    category: 'Calligraphy',
    description: { ...DESCRIPTION_PLACEHOLDER },
    featured: false,
  },
  {
    id: 'autumn-in-motion',
    slug: 'autumn-in-motion',
    // Only a small photo (383 × 408) was available; replace with a larger one when you have it.
    image: '/images/artworks/autumn-in-motion.webp',
    width: 383,
    height: 408,
    color: '#583808',
    sourceFile: 'Autumn in Motion.jpg',
    title: { en: 'Autumn in Motion', da: 'Autumn in Motion' },
    category: 'Calligraphy',
    description: { ...DESCRIPTION_PLACEHOLDER },
    featured: false,
  },
  {
    id: 'untitled-i',
    slug: 'untitled-i',
    image: '/images/artworks/untitled-i.webp',
    thumbnail: '/images/artworks/untitled-i-thumb.webp',
    width: 720,
    height: 1280,
    color: '#c8c8c8',
    sourceFile: 'photo_2020-06-16_10-05-08.jpg',
    title: { en: 'Untitled I', da: 'Uden titel I' },
    category: 'Calligraphy',
    description: { ...DESCRIPTION_PLACEHOLDER },
    featured: false,
  },
  {
    id: 'untitled-ii',
    slug: 'untitled-ii',
    image: '/images/artworks/untitled-ii.webp',
    thumbnail: '/images/artworks/untitled-ii-thumb.webp',
    width: 609,
    height: 1326,
    color: '#c8a878',
    sourceFile: 'photo_2020-06-19_16-47-26.jpg',
    title: { en: 'Untitled II', da: 'Uden titel II' },
    category: 'Calligraphy',
    description: { ...DESCRIPTION_PLACEHOLDER },
    featured: false,
  },
  {
    id: 'untitled-iii',
    slug: 'untitled-iii',
    image: '/images/artworks/untitled-iii.webp',
    thumbnail: '/images/artworks/untitled-iii-thumb.webp',
    width: 1280,
    height: 1216,
    color: '#383838',
    sourceFile: 'photo_2020-07-29_14-09-23.jpg',
    title: { en: 'Untitled III', da: 'Uden titel III' },
    category: 'Calligraphy',
    description: { ...DESCRIPTION_PLACEHOLDER },
    featured: false,
  },
  {
    id: 'untitled-iv',
    slug: 'untitled-iv',
    image: '/images/artworks/untitled-iv.webp',
    thumbnail: '/images/artworks/untitled-iv-thumb.webp',
    width: 1217,
    height: 979,
    color: '#783838',
    sourceFile: 'photo_2020-08-23_18-26-28.jpg',
    title: { en: 'Untitled IV', da: 'Uden titel IV' },
    category: 'Calligraphy',
    description: { ...DESCRIPTION_PLACEHOLDER },
    featured: false,
  },
  {
    id: 'untitled-v',
    slug: 'untitled-v',
    image: '/images/artworks/untitled-v.webp',
    thumbnail: '/images/artworks/untitled-v-thumb.webp',
    width: 1148,
    height: 1163,
    color: '#382828',
    sourceFile: 'photo1_2020-11-12_17-39-07.jpg',
    title: { en: 'Untitled V', da: 'Uden titel V' },
    category: 'Calligraphy',
    description: { ...DESCRIPTION_PLACEHOLDER },
    featured: false,
  },
]

/** All categories, in filter order. Only those with at least one artwork are shown as filters. */
export const categories: Category[] = ['Calligraphy', 'Painting', 'Drawing', 'Handmade', 'Uncategorized']

export const usedCategories = categories.filter((c) => artworks.some((a) => a.category === c))

export const getArtwork = (slug: string) => artworks.find((a) => a.slug === slug)

export const featuredArtworks = artworks.filter((a) => a.featured)
