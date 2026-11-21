import type { Artwork } from '@/types'

export const cn = (...classes: Array<string | false | null | undefined>) => classes.filter(Boolean).join(' ')

/** Width and height of a piece's image, so it is always shown at its true shape. */
export function artworkSize(artwork: Artwork) {
  return { w: artwork.width, h: artwork.height }
}
