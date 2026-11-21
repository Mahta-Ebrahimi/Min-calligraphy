import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'motion/react'
import { ArrowDown } from 'lucide-react'
import { LinkButton } from '@/components/ui/Button'
import { ArtworkFrame } from '@/components/gallery/ArtworkFrame'
import { featuredArtworks } from '@/data/artworks'
import { siteConfig } from '@/data/siteConfig'
import { easeLuxe } from '@/lib/motion'
import { useLanguage } from '@/i18n/LanguageContext'

const rise = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 1, ease: easeLuxe } },
}

export function Hero() {
  const { lang, t } = useLanguage()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const artY = useTransform(scrollYProgress, [0, 1], ['0%', '12%'])
  const feature = featuredArtworks[0]

  return (
    <section ref={ref} className="relative overflow-hidden pt-32 pb-20 sm:pt-40 lg:flex lg:min-h-svh lg:items-center lg:pt-28">
      <div
        aria-hidden="true"
        className="hero-atmosphere pointer-events-none absolute inset-0"
      />

      <div className="container-luxe relative grid items-center gap-16 lg:grid-cols-12 lg:gap-8">
        <motion.div
          className="lg:col-span-6"
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.14, delayChildren: 0.2 } } }}
        >
          <motion.p className="eyebrow" variants={rise}>
            {t.hero.eyebrow}
          </motion.p>
          <motion.h1
            className="mt-7 text-[3.25rem] leading-[0.98] text-ivory sm:text-7xl lg:text-[5.25rem] xl:text-8xl"
            variants={rise}
          >
            {t.hero.titleStart} <em className="font-normal text-gold">{t.hero.titleAccent}</em>
          </motion.h1>
          <motion.p className="mt-8 max-w-md text-lg leading-relaxed font-light text-ivory/70" variants={rise}>
            {siteConfig.description[lang]}
          </motion.p>
          <motion.div className="mt-11 flex flex-col gap-3 sm:flex-row sm:gap-4" variants={rise}>
            <LinkButton to="/gallery" className="w-full sm:w-auto">
              {t.hero.ctaGallery}
            </LinkButton>
            <LinkButton to="/contact?type=commission" variant="outline" className="w-full sm:w-auto">
              {t.hero.ctaCommission}
            </LinkButton>
          </motion.div>
        </motion.div>

        {feature && (
          <motion.figure style={{ y: artY }} className="mx-auto w-full max-w-md lg:col-span-5 lg:col-start-8 lg:max-w-none">
            <motion.div
              initial={{ clipPath: 'inset(100% 0% 0% 0%)', opacity: 0.4 }}
              animate={{ clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 }}
              transition={{ duration: 1.6, delay: 0.35, ease: easeLuxe }}
            >
              <Link to={`/gallery/${feature.slug}`} className="group block" aria-label={t.gallery.view(feature.title[lang])}>
                <ArtworkFrame
                  artwork={feature}
                  size="large"
                  sizes="(min-width: 1024px) 40vw, 90vw"
                  eager
                  className="bg-wall/60"
                />
              </Link>
            </motion.div>
            <motion.figcaption
              className="mt-5 flex items-baseline justify-between gap-4 text-xs text-ivory/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.8 }}
            >
              <span>
                <span className="text-[0.65rem] tracking-[0.25em] text-gold uppercase">{t.hero.featured}</span>
                <span className="ml-3 font-display text-base text-ivory/85 italic">{feature.title[lang]}</span>
              </span>
              <span className="shrink-0">
                {t.categories[feature.category]}
                {feature.year && <> · {feature.year}</>}
              </span>
            </motion.figcaption>
          </motion.figure>
        )}
      </div>

      <motion.a
        href="#featured"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[0.65rem] tracking-[0.3em] text-ivory/45 uppercase hover:text-gold lg:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
      >
        {t.hero.scroll}
        <motion.span animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}>
          <ArrowDown size={14} strokeWidth={1.25} aria-hidden="true" />
        </motion.span>
      </motion.a>
    </section>
  )
}
