import { siteConfig } from '@/data/siteConfig'

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[]
  }
}

const containerId = /^GTM-[A-Z0-9]+$/.test(siteConfig.tagManagerId) ? siteConfig.tagManagerId : ''
let lastTrackedPath = ''

/** Loads Google Tag Manager, if a container ID is set in siteConfig. */
export function initTagManager() {
  if (!containerId) return
  window.dataLayer = window.dataLayer ?? []
  window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' })
  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtm.js?id=${containerId}`
  document.head.appendChild(script)
}

/**
 * Sends a `virtual_page_view` event to Tag Manager when the visitor moves to another page.
 * The site switches pages without reloading, so Tag Manager's own page view only fires once.
 */
export function trackPageView(title: string) {
  if (!containerId) return
  const path = window.location.pathname + window.location.search
  if (path === lastTrackedPath) return
  lastTrackedPath = path
  window.dataLayer?.push({
    event: 'virtual_page_view',
    page_path: path,
    page_location: window.location.href,
    page_title: title,
  })
}
