import { siteConfig } from '@/data/siteConfig'
import { useLanguage } from '@/i18n/LanguageContext'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'

export function Process() {
  const { lang, t } = useLanguage()

  return (
    <section className="py-24 sm:py-32">
      <div className="container-luxe">
        <SectionHeading eyebrow={t.process.eyebrow} title={t.process.title} intro={t.process.intro} />
        <ol className="mt-16 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {siteConfig.process.map((step, i) => (
            <Reveal as="li" key={step.title.en} delay={i * 0.1} className="group relative border-t border-ivory/15 pt-7">
              <span
                aria-hidden="true"
                className="absolute -top-px left-0 h-px w-10 bg-gold transition-[width] duration-700 ease-luxe group-hover:w-full"
              />
              <span className="font-display text-4xl leading-none text-gold">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="mt-6 text-[1.75rem] leading-tight text-ivory">{step.title[lang]}</h3>
              <p className="mt-3 leading-relaxed text-ivory/60">{step.text[lang]}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
