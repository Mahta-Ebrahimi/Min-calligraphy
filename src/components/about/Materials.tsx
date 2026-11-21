import { siteConfig } from '@/data/siteConfig'
import { useLanguage } from '@/i18n/LanguageContext'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'

export function Materials() {
  const { lang, t } = useLanguage()
  const { studio } = siteConfig.artist

  return (
    // A warm paper band that stays light in both themes.
    <section data-theme="light" className="bg-paper py-24 text-ivory sm:py-32 paper-grain">
      <div className="container-luxe">
        <SectionHeading
          eyebrow={t.about.materialsEyebrow}
          title={t.about.materialsTitle}
          intro={t.about.materialsIntro}
        />

        {studio && (
          <Reveal className="mt-14 aspect-[21/9] overflow-hidden">
            <img src={studio} alt={t.about.studioAlt} loading="lazy" className="h-full w-full object-cover" />
          </Reveal>
        )}

        <ul className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {siteConfig.materials.map((item, i) => (
            <Reveal as="li" key={item.name.en} delay={i * 0.08} className="border-t border-ivory/20 pt-6">
              <h3 className="text-3xl">{item.name[lang]}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ivory/65">{item.text[lang]}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
