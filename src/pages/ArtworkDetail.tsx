import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowLeft, ArrowRight, Expand, X } from 'lucide-react'
import { artworks, getArtwork } from '@/data/artworks'
import { usePageMeta } from '@/hooks/usePageMeta'
import { useLanguage } from '@/i18n/LanguageContext'
import { ArtworkImage } from '@/components/gallery/ArtworkImage'
import { ArtworkCard } from '@/components/gallery/ArtworkCard'
import { ArtworkFrame } from '@/components/gallery/ArtworkFrame'
import { LinkButton } from '@/components/ui/Button'
import { Ornament } from '@/components/ui/Ornament'
import { artworkSize, cn } from '@/lib/utils'
import { easeLuxe } from '@/lib/motion'
import NotFound from './NotFound'

export default function ArtworkDetail() {
  const { lang, t } = useLanguage()
  const { slug = '' } = useParams()
  const artwork = getArtwork(slug)
  const [zoomed, setZoomed] = useState(false)

  usePageMeta(
    artwork ? `${artwork.title[lang]} (${t.categories[artwork.category]})` : t.artwork.notFound,
    artwork ? t.artwork.alt(artwork.title[lang], t.categories[artwork.category]) + '.' : undefined,
  )

  useEffect(() => {
    if (!zoomed) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setZoomed(false)
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [zoomed])

  if (!artwork) return <NotFound />

  const title = artwork.title[lang]
  const size = artworkSize(artwork)
  const categoryName = t.categories[artwork.category]
  const index = artworks.indexOf(artwork)
  const prev = artworks[(index - 1 + artworks.length) % artworks.length]
  const next = artworks[(index + 1) % artworks.length]
  const related = artworks.filter((a) => a.category === artwork.category && a.slug !== artwork.slug).slice(0, 3)

  // Only details that have been filled in are listed.
  const specs = [
    { key: 'category', label: t.artwork.category, value: categoryName },
    artwork.year && { key: 'year', label: t.artwork.year, value: String(artwork.year) },
    artwork.medium && { key: 'medium', label: t.artwork.medium, value: artwork.medium[lang] },
    artwork.dimensions && { key: 'dimensions', label: t.artwork.dimensions, value: artwork.dimensions },
    artwork.availability && { key: 'status', label: t.artwork.status, value: t.availability[artwork.availability] },
    artwork.price && artwork.availability === 'available' && { key: 'price', label: t.artwork.price, value: artwork.price[lang] },
  ].filter((s): s is { key: string; label: string; value: string } => Boolean(s))

  // Sold and commissioned works invite a similar commission; everything else a direct enquiry.
  const unavailable = artwork.availability === 'sold' || artwork.availability === 'commission'
  const enquireTo = unavailable ? `/contact?type=commission&artwork=${artwork.slug}` : `/contact?artwork=${artwork.slug}`

  return (
    <article className="pt-32 pb-24 sm:pt-40">
      <div className="container-luxe">
        <nav aria-label={t.artwork.breadcrumb} className="mb-10 text-xs tracking-[0.2em] text-ivory/45 uppercase">
          <Link to="/gallery" className="inline-flex items-center gap-2 hover:text-gold">
            <ArrowLeft size={14} aria-hidden="true" /> {t.artwork.back}
          </Link>
        </nav>

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: easeLuxe }}
          >
            <button
              type="button"
              onClick={() => setZoomed(true)}
              className="group relative block w-full cursor-zoom-in"
              aria-label={t.artwork.fullscreen(title)}
            >
              <ArtworkFrame artwork={artwork} size="large" sizes="(min-width: 1024px) 55vw, 100vw" eager />
              <span className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center bg-ink/60 text-ivory opacity-100 backdrop-blur transition-opacity sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-visible:opacity-100">
                <Expand size={16} strokeWidth={1.25} aria-hidden="true" />
              </span>
            </button>
          </motion.div>

          <motion.div
            className="lg:col-span-5 lg:pt-6"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.15, ease: easeLuxe }}
          >
            <p className="eyebrow">{categoryName}</p>
            <h1 className="mt-4 text-5xl leading-none text-ivory sm:text-6xl">{title}</h1>

            <Ornament className="my-10 justify-start" />

            <p className="leading-relaxed text-ivory/70">{artwork.description[lang]}</p>

            <dl className="mt-10 divide-y divide-ivory/10 border-y border-ivory/10">
              {specs.map((s) => (
                <div key={s.key} className="flex justify-between gap-6 py-4 text-sm">
                  <dt className="tracking-[0.2em] text-ivory/45 uppercase">{s.label}</dt>
                  <dd
                    className={cn(
                      'text-right text-ivory/85',
                      s.key === 'status' && artwork.availability === 'available' && 'text-gold',
                    )}
                  >
                    {s.value}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-10 flex flex-wrap gap-4">
              <LinkButton to={enquireTo} className="w-full sm:w-auto">
                {unavailable ? t.artwork.similar : t.artwork.enquire}
              </LinkButton>
            </div>
          </motion.div>
        </div>

        <nav aria-label={t.artwork.more} className="mt-24 flex items-center justify-between border-t border-ivory/10 pt-8">
          <Link to={`/gallery/${prev.slug}`} className="group flex items-center gap-3 text-ivory/70 hover:text-gold">
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" aria-hidden="true" />
            <span>
              <span className="block text-[0.65rem] tracking-[0.25em] text-ivory/40 uppercase">{t.artwork.previous}</span>
              <span className="font-display text-xl">{prev.title[lang]}</span>
            </span>
          </Link>
          <Link to={`/gallery/${next.slug}`} className="group flex items-center gap-3 text-right text-ivory/70 hover:text-gold">
            <span>
              <span className="block text-[0.65rem] tracking-[0.25em] text-ivory/40 uppercase">{t.artwork.next}</span>
              <span className="font-display text-xl">{next.title[lang]}</span>
            </span>
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </nav>

        {related.length > 0 && (
          <section className="mt-24" aria-labelledby="related-heading">
            <h2 id="related-heading" className="text-3xl text-ivory sm:text-4xl">
              {t.artwork.moreIn(categoryName)}
            </h2>
            <div className="mt-10 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-10">
              {related.map((a) => (
                <ArtworkCard key={a.slug} artwork={a} />
              ))}
            </div>
          </section>
        )}
      </div>

      <AnimatePresence>
        {zoomed && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={title}
            className="fixed inset-0 z-70 flex items-center justify-center bg-ink/95 p-4 backdrop-blur-sm sm:p-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setZoomed(false)}
          >
            <button
              type="button"
              autoFocus
              onClick={() => setZoomed(false)}
              className="absolute top-5 right-5 p-2 text-ivory hover:text-gold"
              aria-label={t.artwork.close}
            >
              <X size={28} strokeWidth={1.25} />
            </button>
            <motion.div
              className="shadow-lifted"
              style={{ aspectRatio: `${size.w} / ${size.h}`, width: `min(92vw, calc(86svh * ${size.w / size.h}))` }}
              initial={{ scale: 0.94 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.94 }}
              transition={{ duration: 0.5, ease: easeLuxe }}
              onClick={(e) => e.stopPropagation()}
            >
              <ArtworkImage artwork={artwork} sizes="100vw" eager />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  )
}
