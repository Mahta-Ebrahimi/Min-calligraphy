import { siteConfig } from '@/data/siteConfig'
import { cn } from '@/lib/utils'

interface LogoProps {
  /** `md` for the header, `lg` for the footer. */
  size?: 'md' | 'lg'
  className?: string
}

const heights = {
  md: 'h-12 sm:h-14 lg:h-[4.5rem]',
  lg: 'h-24 sm:h-28',
}

/**
 * The Mahta Art Studio logo artwork, never cropped or stretched. Light mode shows the original
 * ink colours; dark mode swaps to the light version of the same artwork (switched in CSS, no flicker).
 */
export function Logo({ size = 'md', className }: LogoProps) {
  const { image, imageOnDark, width, height } = siteConfig.logo

  return (
    <span className={cn('block', heights[size], className)} style={{ aspectRatio: `${width} / ${height}` }}>
      <img
        src={image}
        alt={siteConfig.name}
        width={width}
        height={height}
        decoding="async"
        draggable={false}
        className="h-full w-full object-contain dark:hidden"
      />
      <img
        src={imageOnDark}
        alt={siteConfig.name}
        width={width}
        height={height}
        decoding="async"
        draggable={false}
        className="hidden h-full w-full object-contain dark:block"
      />
    </span>
  )
}
