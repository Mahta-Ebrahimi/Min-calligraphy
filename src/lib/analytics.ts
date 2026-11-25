import { siteConfig } from '@/data/siteConfig'

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[]
  }
}

let lastTrackedPath = ''

/**
 * Sends a `virtual_page_view` event to Google Tag Manager (loaded in index.html) when the
 * visitor moves to another page. The site switches pages without reloading, so Tag Manager's
 * own page view only fires once.
 */
export function trackPageView(title: string) {
  if (!siteConfig.tagManagerId || !window.dataLayer) return
  const path = window.location.pathname + window.location.search
  if (path === lastTrackedPath) return
  lastTrackedPath = path
  window.dataLayer.push({
    event: 'virtual_page_view',
    page_path: path,
    page_location: window.location.href,
    page_title: title,
  })
}
