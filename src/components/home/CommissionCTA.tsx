import { LinkButton } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Reveal'
import { Ornament } from '@/components/ui/Ornament'
import { useLanguage } from '@/i18n/LanguageContext'

export function CommissionCTA() {
  const { t } = useLanguage()

  return (
    // A deep green band that stays dark in both themes.
    <section data-theme="dark" className="relative overflow-hidden bg-forest py-24 sm:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_50%_120%,rgba(201,166,107,0.18),transparent_70%)]"
      />
      <Reveal className="container-luxe relative text-center">
        <Ornament className="[&_circle]:fill-forest" />
        <h2 className="mx-auto mt-8 max-w-3xl text-4xl leading-[1.1] text-ivory sm:text-5xl lg:text-6xl">
          {t.cta.titleStart} <em className="text-gold">{t.cta.titleAccent}</em> {t.cta.titleEnd}
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed font-light text-ivory/75">{t.cta.intro}</p>
        <div className="mx-auto mt-10 flex max-w-sm flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center sm:gap-4">
          <LinkButton to="/contact?type=commission" className="w-full sm:w-auto">
            {t.cta.request}
          </LinkButton>
          <LinkButton to="/about" variant="outline" className="w-full sm:w-auto">
            {t.cta.meet}
          </LinkButton>
        </div>
      </Reveal>
    </section>
  )
}
