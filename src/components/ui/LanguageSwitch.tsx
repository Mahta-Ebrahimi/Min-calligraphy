import { languages, useLanguage } from '@/i18n/LanguageContext'
import { cn } from '@/lib/utils'

/** Compact EN / DA toggle. */
export function LanguageSwitch({ className }: { className?: string }) {
  const { lang, setLang, t } = useLanguage()

  return (
    <div role="group" aria-label={t.switchTo} className={cn('flex items-center text-[0.68rem] font-medium tracking-[0.2em]', className)}>
      {languages.map((code, i) => (
        <span key={code} className="flex items-center">
          {i > 0 && <span className="px-1.5 text-ivory/25" aria-hidden="true">/</span>}
          <button
            type="button"
            lang={code}
            aria-pressed={lang === code}
            onClick={() => setLang(code)}
            className={cn(
              'uppercase transition-colors duration-300',
              lang === code ? 'text-gold' : 'text-ivory/50 hover:text-ivory',
            )}
          >
            {code}
          </button>
        </span>
      ))}
    </div>
  )
}
