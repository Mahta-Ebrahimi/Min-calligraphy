import { useEffect } from 'react'
import { siteConfig } from '@/data/siteConfig'
import { useLanguage } from '@/i18n/LanguageContext'

const setMeta = (attr: 'name' | 'property', key: string, content: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.content = content
}

/**
 * Sets the document title plus description, Open Graph and Twitter tags for the current page,
 * in the active language. An empty title gives the homepage title.
 */
export function usePageMeta(title: string, description?: string) {
  const { lang } = useLanguage()
  const desc = description ?? siteConfig.seo.description[lang]

  useEffect(() => {
    const fullTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.seo.title[lang]
    document.title = fullTitle
    setMeta('name', 'description', desc)
    setMeta('property', 'og:title', fullTitle)
    setMeta('property', 'og:description', desc)
    setMeta('property', 'og:site_name', siteConfig.name)
    setMeta('property', 'og:url', window.location.href)
    setMeta('property', 'og:locale', lang === 'da' ? 'da_DK' : 'en_GB')
    setMeta('name', 'twitter:title', fullTitle)
    setMeta('name', 'twitter:description', desc)
  }, [title, desc, lang])
}
