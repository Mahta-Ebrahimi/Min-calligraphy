import { useCallback, useState } from 'react'
import type { Artwork } from '@/types'
import { useLanguage } from '@/i18n/LanguageContext'
import { cn } from '@/lib/utils'

const THUMB_MAX = 900

interface ArtworkImageProps {
  artwork: Artwork
  /** Rendered width hint for the browser, used to pick the thumbnail or the full image. */
  sizes?: string
  eager?: boolean
  className?: string
}

/**
 * The artwork photograph, never cropped or stretched. While it loads, the frame shows the
 * artwork's dominant colour, then the image fades in. Grids get the thumbnail; large views the full image.
 */
export function ArtworkImage({ artwork, sizes = '100vw', eager = false, className }: ArtworkImageProps) {
  const { lang, t } = useLanguage()
  const [loaded, setLoaded] = useState(false)

  // Cached images may finish before React attaches onLoad, so check on mount too.
  const ref = useCallback((img: HTMLImageElement | null) => {
    if (img?.complete && img.naturalWidth > 0) setLoaded(true)
  }, [])

  const thumbWidth = Math.round(artwork.width * Math.min(1, THUMB_MAX / Math.max(artwork.width, artwork.height)))
  const srcSet =
    artwork.thumbnail && thumbWidth < artwork.width
      ? `${artwork.thumbnail} ${thumbWidth}w, ${artwork.image} ${artwork.width}w`
      : undefined

  return (
    <div className={cn('relative h-full w-full overflow-hidden', className)} style={{ backgroundColor: artwork.color ?? '#1c1712' }}>
      <img
        ref={ref}
        src={artwork.image}
        srcSet={srcSet}
        sizes={srcSet ? sizes : undefined}
        width={artwork.width}
        height={artwork.height}
        alt={t.artwork.alt(artwork.title[lang], t.categories[artwork.category])}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        draggable={false}
        onLoad={() => setLoaded(true)}
        className={cn(
          'h-full w-full object-contain transition-[opacity,filter] duration-700 ease-luxe',
          loaded ? 'opacity-100 blur-0' : 'opacity-0 blur-sm',
        )}
      />
    </div>
  )
}
