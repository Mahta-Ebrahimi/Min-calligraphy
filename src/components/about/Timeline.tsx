import { siteConfig } from '@/data/siteConfig'
import { useLanguage } from '@/i18n/LanguageContext'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'

export function Timeline() {
  const { lang, t } = useLanguage()

  return (
    <section className="border-t border-ivory/10 py-24 sm:py-32">
      <div className="container-luxe grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHeading eyebrow={t.about.timelineEyebrow} title={t.about.timelineTitle} />
        </div>
        <ol className="relative border-l border-gold/25 lg:col-span-8">
          {siteConfig.milestones.map((m, i) => (
            <Reveal as="li" key={m.year.en} delay={i * 0.08} className="relative pb-12 pl-10 last:pb-0">
              <span className="absolute top-2 -left-[5px] h-2.5 w-2.5 rotate-45 bg-gold" aria-hidden="true" />
              <p className="font-display text-3xl text-gold">{m.year[lang]}</p>
              <p className="mt-2 max-w-lg leading-relaxed text-ivory/65">{m.text[lang]}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
