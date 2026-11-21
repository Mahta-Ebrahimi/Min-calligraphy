import { usePageMeta } from '@/hooks/usePageMeta'
import { useLanguage } from '@/i18n/LanguageContext'
import { LinkButton } from '@/components/ui/Button'

export default function NotFound() {
  const { t } = useLanguage()
  usePageMeta(t.notFound.metaTitle)

  return (
    <section className="flex min-h-[80svh] flex-col items-center justify-center px-5 pt-28 text-center">
      <span className="font-display text-8xl leading-none text-gold/70 italic" aria-hidden="true">
        404
      </span>
      <h1 className="mt-4 text-5xl text-ivory">{t.notFound.title}</h1>
      <p className="mt-4 max-w-md text-ivory/60">{t.notFound.body}</p>
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <LinkButton to="/">{t.notFound.home}</LinkButton>
        <LinkButton to="/gallery" variant="outline">
          {t.notFound.gallery}
        </LinkButton>
      </div>
    </section>
  )
}
