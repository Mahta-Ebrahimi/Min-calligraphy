import { AnimatePresence, motion } from 'motion/react'
import { CheckCircle2, Mail, AlertCircle } from 'lucide-react'
import { siteConfig } from '@/data/siteConfig'
import { useLanguage } from '@/i18n/LanguageContext'

export type FormState = { status: 'idle' } | { status: 'sent' } | { status: 'mailto' } | { status: 'error' }

export function FormStatus({ state }: { state: FormState }) {
  const { lang, t } = useLanguage()

  return (
    <div aria-live="polite">
      <AnimatePresence mode="wait">
        {state.status !== 'idle' && (
          <motion.div
            key={state.status}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-6 flex gap-3 border border-ivory/15 bg-ink-soft/60 p-5 text-sm leading-relaxed"
          >
            {state.status === 'sent' && (
              <>
                <CheckCircle2 className="shrink-0 text-gold" size={20} strokeWidth={1.25} aria-hidden="true" />
                <p>{t.status.sent(siteConfig.responseTime[lang])}</p>
              </>
            )}
            {state.status === 'mailto' && (
              <>
                <Mail className="shrink-0 text-gold" size={20} strokeWidth={1.25} aria-hidden="true" />
                <p>
                  {t.status.mailtoBefore} <strong>{t.status.mailtoSend}</strong> {t.status.mailtoAfter}{' '}
                  <a href={`mailto:${siteConfig.email}`} className="text-gold underline underline-offset-4">
                    {siteConfig.email}
                  </a>
                  .
                </p>
              </>
            )}
            {state.status === 'error' && (
              <>
                <AlertCircle className="shrink-0 text-error" size={20} strokeWidth={1.25} aria-hidden="true" />
                <p>{t.status.failed}</p>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
