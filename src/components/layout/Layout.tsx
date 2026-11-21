import { Suspense, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { motion } from 'motion/react'
import { Header } from './Header'
import { Footer } from './Footer'
import { easeLuxe } from '@/lib/motion'
import { useLanguage } from '@/i18n/LanguageContext'

export function Layout() {
  const { pathname } = useLocation()
  const { t } = useLanguage()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])

  return (
    <div className="flex min-h-svh flex-col">
      <a
        href="#main"
        className="sr-only z-60 bg-gold px-4 py-2 text-on-gold focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
      >
        {t.common.skip}
      </a>
      <Header />
      <motion.main
        id="main"
        key={pathname}
        className="flex-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: easeLuxe }}
      >
        <Suspense fallback={<div className="min-h-svh" />}>
          <Outlet />
        </Suspense>
      </motion.main>
      <Footer />
      <div aria-hidden="true" className="grain pointer-events-none fixed inset-0 z-[90]" />
    </div>
  )
}
