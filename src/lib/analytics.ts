import { siteConfig } from '@/data/siteConfig'

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

/**
 * Sends an event to Google Analytics 4 through the Google tag (loaded in index.html).
 * Does nothing when no tag ID is configured.
 */
function sendEvent(name: string, params: Record<string, unknown> = {}) {
  if (!siteConfig.tagManagerId) return
  window.dataLayer = window.dataLayer || []
  // The Google tag reads commands pushed as an `arguments` object, the same way gtag() does.
  const gtag =
    window.gtag ||
    function (..._args: unknown[]) {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer!.push(arguments)
    }
  gtag('event', name, params)
}

let lastTrackedPath = ''
let isFirstPageView = true

/**
 * Sends a GA4 `page_view` with the correct page title when the visitor moves to another page.
 * The site switches pages without reloading, so the Google tag only records the first page itself.
 * (In GA4, 'Page changes based on browser history events' is turned off to avoid double counts.)
 */
export function trackPageView(title: string) {
  const path = window.location.pathname + window.location.search
  if (path === lastTrackedPath) return
  lastTrackedPath = path
  if (isFirstPageView) {
    isFirstPageView = false
    return
  }
  sendEvent('page_view', {
    page_title: title,
    page_location: window.location.href,
    page_path: path,
  })
}

/**
 * Tracks clicks on email and Instagram links anywhere on the site.
 * Call once when the app starts (see main.tsx).
 */
export function initClickTracking() {
  document.addEventListener(
    'click',
    (event) => {
      const link = (event.target as Element | null)?.closest('a[href]')
      if (!link) return
      const href = link.getAttribute('href') ?? ''
      if (href.startsWith('mailto:')) {
        sendEvent('contact_email', { link_url: href })
      } else if (href.includes('instagram.com')) {
        sendEvent('instagram_click', { link_url: href })
      }
    },
    { capture: true },
  )
}
