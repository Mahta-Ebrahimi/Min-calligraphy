import { useSearchParams } from 'react-router-dom'
import { motion } from 'motion/react'
import { Camera, Clock, Mail, MapPin } from 'lucide-react'
import { usePageMeta } from '@/hooks/usePageMeta'
import { siteConfig } from '@/data/siteConfig'
import { getArtwork } from '@/data/artworks'
import { useLanguage } from '@/i18n/LanguageContext'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'
import { ContactForm } from '@/components/contact/ContactForm'
import { CommissionForm } from '@/components/contact/CommissionForm'
import { cn } from '@/lib/utils'
import { easeLuxe } from '@/lib/motion'

type Tab = 'general' | 'commission'

export default function Contact() {
  const { lang, t } = useLanguage()
  usePageMeta(t.contact.metaTitle, t.contact.metaDesc)

  const [params, setParams] = useSearchParams()
  const tab: Tab = params.get('type') === 'commission' ? 'commission' : 'general'
  const artwork = getArtwork(params.get('artwork') ?? '')
  const artworkTitle = artwork?.title[lang]

  const tabs: { id: Tab; label: string }[] = [
    { id: 'general', label: t.contact.general },
    { id: 'commission', label: t.contact.commission },
  ]

  const selectTab = (next: Tab) => {
    const updated = new URLSearchParams(params)
    if (next === 'commission') updated.set('type', 'commission')
    else updated.delete('type')
    setParams(updated, { replace: true, preventScrollReset: true })
  }

  const details = [
    { icon: Mail, label: t.contact.email, value: siteConfig.email, href: `mailto:${siteConfig.email}` },
    { icon: MapPin, label: t.contact.studio, value: siteConfig.location[lang] },
    { icon: Clock, label: t.contact.response, value: t.contact.responseValue(siteConfig.responseTime[lang]) },
    { icon: Camera, label: t.contact.instagram, value: siteConfig.social.instagramHandle, href: siteConfig.social.instagram },
  ]

  return (
    <div className="pt-36 pb-24 sm:pt-44 sm:pb-32">
      <div className="container-luxe grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeading as="h1" eyebrow={t.contact.eyebrow} title={t.contact.title} intro={t.contact.intro} />
          <Reveal delay={0.1}>
            <ul className="mt-12 space-y-6">
              {details.map(({ icon: Icon, label, value, href }) => (
                <li key={label} className="flex items-start gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-gold/40 text-gold">
                    <Icon size={16} strokeWidth={1.25} aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-[0.65rem] tracking-[0.25em] text-ivory/45 uppercase">{label}</span>
                    {href ? (
                      <a
                        href={href}
                        className="text-ivory/85 hover:text-gold"
                        {...(href.startsWith('http') && { target: '_blank', rel: 'noopener noreferrer' })}
                      >
                        {value}
                      </a>
                    ) : (
                      <span className="text-ivory/85">{value}</span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="lg:col-span-7">
          <div className="border border-ivory/10 bg-ink-soft/40 p-6 sm:p-10">
            <div role="tablist" aria-label={t.contact.tabsLabel} className="mb-10 flex border-b border-ivory/10">
              {tabs.map((item) => {
                const active = tab === item.id
                return (
                  <button
                    key={item.id}
                    type="button"
                    role="tab"
                    id={`tab-${item.id}`}
                    aria-selected={active}
                    aria-controls={`panel-${item.id}`}
                    onClick={() => selectTab(item.id)}
                    className={cn(
                      'relative flex-1 pb-4 text-[0.7rem] font-medium tracking-[0.22em] uppercase transition-colors sm:flex-none sm:pr-10',
                      active ? 'text-gold' : 'text-ivory/55 hover:text-ivory',
                    )}
                  >
                    {item.label}
                    {active && (
                      <motion.span
                        layoutId="contact-tab"
                        className="absolute inset-x-0 -bottom-px h-px bg-gold sm:right-10"
                        transition={{ duration: 0.5, ease: easeLuxe }}
                      />
                    )}
                  </button>
                )
              })}
            </div>

            {artwork && (
              <p className="mb-8 border-l-2 border-gold pl-4 text-sm text-ivory/70">
                {t.contact.regarding} <span className="text-gold">{artworkTitle}</span> · {t.categories[artwork.category]}
              </p>
            )}

            <motion.div
              key={tab}
              id={`panel-${tab}`}
              role="tabpanel"
              aria-labelledby={`tab-${tab}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: easeLuxe }}
            >
              {tab === 'general' ? (
                <ContactForm defaultSubject={artworkTitle ? t.contact.defaultSubject(artworkTitle) : ''} />
              ) : (
                <CommissionForm defaultDetails={artworkTitle ? t.contact.defaultDetails(artworkTitle) : ''} />
              )}
            </motion.div>
          </div>
        </Reveal>
      </div>
    </div>
  )
}
