import type { Artwork } from '@/types'
import { ArtworkImage } from './ArtworkImage'
import { artworkSize, cn } from '@/lib/utils'

interface ArtworkFrameProps {
  artwork: Artwork
  /** `card` for grids; `large` adds less wall around the piece and loads the full image. */
  size?: 'card' | 'large'
  /** Lift the piece when an ancestor with the `group` class is hovered. */
  interactive?: boolean
  /** Browser hint for how wide the frame renders. */
  sizes?: string
  eager?: boolean
  className?: string
}

/** Wall padding as a fraction of the wall's width, per size. */
const WALL_PADDING = { card: 0.11, large: 0.08 }

/**
 * Presents a piece the way a gallery would: hung at its true proportions on a
 * softly lit wall, with a shadow that deepens as the piece lifts on hover.
 */
export function ArtworkFrame({
  artwork,
  size = 'card',
  interactive = true,
  sizes = '(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 80vw',
  eager = false,
  className,
}: ArtworkFrameProps) {
  const { w, h } = artworkSize(artwork)
  const pad = WALL_PADDING[size]
  // The wall is 4:5. Pieces narrower than the space inside it fill its height; wider ones fill its width.
  const innerRatio = (1 - 2 * pad) / (1.25 - 2 * pad)
  const tall = w / h <= innerRatio

  return (
    <div
      className={cn('relative flex aspect-4/5 items-center justify-center overflow-hidden bg-wall', className)}
      style={{ padding: `${pad * 100}%` }}
    >
      {/* Gallery spotlight, brightening on hover. */}
      <div
        aria-hidden="true"
        className={cn(
          'pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_0%,var(--spotlight),transparent_75%)] opacity-70 transition-opacity duration-700',
          interactive && 'group-hover:opacity-100',
        )}
      />
      <div
        style={{ aspectRatio: `${w} / ${h}` }}
        className={cn(
          'relative shadow-hung transition-[translate,box-shadow] duration-700 ease-luxe',
          tall ? 'h-full' : 'w-full',
          interactive && 'group-hover:-translate-y-1.5 group-hover:shadow-lifted',
        )}
      >
        <ArtworkImage artwork={artwork} sizes={sizes} eager={eager} />
      </div>
    </div>
  )
}
