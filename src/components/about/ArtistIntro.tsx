import { motion } from 'motion/react'
import { Feather } from 'lucide-react'
import { siteConfig } from '@/data/siteConfig'
import { useLanguage } from '@/i18n/LanguageContext'
import { Reveal } from '@/components/ui/Reveal'
import { easeLuxe } from '@/lib/motion'

export function ArtistIntro() {
  const { lang, t } = useLanguage()
  const { artist } = siteConfig

  return (
    <section className="pt-36 pb-24 sm:pt-44">
      <div className="container-luxe grid items-start gap-16 lg:grid-cols-12">
        <motion.div
          className="relative lg:col-span-5"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: easeLuxe }}
        >
          <div className="absolute -inset-3 border border-gold/30" aria-hidden="true" />
          <div className="relative aspect-4/5 overflow-hidden bg-ink-soft">
            {artist.portrait ? (
              <img src={artist.portrait} alt={t.about.portraitAlt(artist.name)} className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center gap-16 bg-[radial-gradient(circle_at_50%_35%,rgba(201,166,107,0.18),transparent_60%)]">
                <Feather size={96} strokeWidth={0.75} className="text-gold" aria-hidden="true" />
                <p className="text-xs tracking-[0.3em] text-ivory/40 uppercase">{t.about.penCaption}</p>
              </div>
            )}
          </div>
        </motion.div>

        <div className="lg:col-span-7 lg:pt-8">
          <Reveal>
            <p className="eyebrow">{t.about.eyebrow}</p>
            <h1 className="mt-5 text-5xl leading-[1.02] text-ivory sm:text-6xl lg:text-7xl">
              {t.about.titleStart} <em className="text-gold">{t.about.titleAccent}</em>
            </h1>
            <p className="mt-8 font-display text-2xl leading-snug text-ivory/85 italic">{artist.intro[lang]}</p>
          </Reveal>
          <div className="mt-10 space-y-6">
            {artist.bio[lang].map((paragraph, i) => (
              <Reveal key={`${lang}-${i}`} delay={i * 0.08}>
                <p className="leading-relaxed text-ivory/65">{paragraph}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
