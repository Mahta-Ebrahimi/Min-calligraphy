import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import type { Artwork } from '@/types'
import { useLanguage } from '@/i18n/LanguageContext'
import { ArtworkFrame } from './ArtworkFrame'
import { cn } from '@/lib/utils'
import { easeLuxe } from '@/lib/motion'

interface ArtworkCardProps {
  artwork: Artwork
  /** Smaller title on narrow screens, for two-column layouts on phones. */
  compact?: boolean
  className?: string
}

export function ArtworkCard({ artwork, compact, className }: ArtworkCardProps) {
  const { lang, t } = useLanguage()
  const title = artwork.title[lang]
  const available = artwork.availability === 'available'

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.6, ease: easeLuxe }}
      className={cn('group', className)}
    >
      <Link to={`/gallery/${artwork.slug}`} className="block" aria-label={t.gallery.view(title)}>
        <ArtworkFrame artwork={artwork} />

        <div className={compact ? 'mt-3 sm:mt-5' : 'mt-5'}>
          <h3 className={cn('leading-tight text-ivory', compact ? 'text-lg sm:text-2xl' : 'text-2xl')}>
            <span className="bg-gradient-to-r from-gold to-gold bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size,color] duration-500 ease-luxe group-hover:bg-[length:100%_1px] group-hover:text-gold">
              {title}
            </span>
          </h3>
          <div className="mt-2.5 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 text-xs text-ivory/45">
            <span>
              {t.categories[artwork.category]}
              {artwork.year && <> · {artwork.year}</>}
            </span>
            {artwork.availability && (
              <span className={cn('flex items-center gap-2', available && 'text-gold/90')}>
                <span
                  aria-hidden="true"
                  className={cn('h-1.5 w-1.5 rounded-full', available ? 'bg-gold' : 'bg-ivory/30')}
                />
                {t.availability[artwork.availability]}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.article>
  )
}
