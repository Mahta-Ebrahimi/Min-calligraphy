import { Reveal } from '@/components/ui/Reveal'
import { Ornament } from '@/components/ui/Ornament'
import { useLanguage } from '@/i18n/LanguageContext'

export function Philosophy() {
  const { t } = useLanguage()

  return (
    // A warm paper band that stays light in both themes.
    <section data-theme="light" className="relative overflow-hidden bg-paper py-24 text-ivory sm:py-32 paper-grain">
      <div className="container-luxe relative grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-9">
          <Ornament className="mb-10 justify-start [&_circle]:fill-paper" />
          <p className="eyebrow text-gold-deep">{t.philosophy.eyebrow}</p>
          <blockquote className="mt-8">
            <p className="font-display text-[2rem] leading-[1.2] italic sm:text-5xl lg:text-[3.4rem]">{t.philosophy.quote}</p>
            <footer className="mt-7 text-xs tracking-[0.22em] text-ivory/55 uppercase">{t.philosophy.attribution}</footer>
          </blockquote>
          <p className="mt-10 max-w-lg text-[1.05rem] leading-relaxed text-ivory/70">{t.philosophy.body}</p>
        </Reveal>
      </div>
    </section>
  )
}
