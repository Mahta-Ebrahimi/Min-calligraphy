import { Link } from 'react-router-dom'
import { Camera, Mail, MapPin } from 'lucide-react'
import { navItems, siteConfig } from '@/data/siteConfig'
import { useLanguage } from '@/i18n/LanguageContext'
import { LanguageSwitch } from '@/components/ui/LanguageSwitch'
import { Logo } from '@/components/ui/Logo'

export function Footer() {
  const { lang, t } = useLanguage()

  return (
    <footer className="border-t border-ivory/10">
      <div className="container-luxe pt-20 pb-10">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Link to="/" aria-label={t.common.homeLabel(siteConfig.name)} className="inline-block">
              <Logo size="lg" />
            </Link>
            <p className="mt-10 font-display text-3xl leading-tight text-ivory/90 italic sm:text-4xl">{siteConfig.tagline[lang]}.</p>
          </div>

          <nav aria-label="Footer" className="lg:col-span-2 lg:col-start-8">
            <p className="eyebrow mb-6">{t.footer.explore}</p>
            <ul className="space-y-3">
              {navItems.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="text-ivory/70 transition-colors hover:text-gold">
                    {t.nav[item.key]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <p className="eyebrow mb-6">{t.footer.studio}</p>
            <ul className="space-y-3 text-ivory/70">
              <li className="flex items-center gap-3">
                <MapPin size={16} strokeWidth={1.25} className="shrink-0 text-gold" aria-hidden="true" />
                {siteConfig.location[lang]}
              </li>
              <li>
                <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-3 transition-colors hover:text-gold">
                  <Mail size={16} strokeWidth={1.25} className="shrink-0 text-gold" aria-hidden="true" />
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 transition-colors hover:text-gold"
                >
                  <Camera size={16} strokeWidth={1.25} className="shrink-0 text-gold" aria-hidden="true" />
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-20 flex flex-col-reverse gap-6 border-t border-ivory/10 pt-8 text-xs text-ivory/40 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. {t.footer.rights}
          </p>
          <LanguageSwitch />
        </div>
      </div>
    </footer>
  )
}
