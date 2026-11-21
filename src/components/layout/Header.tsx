import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { Menu, X } from 'lucide-react'
import { navItems, siteConfig } from '@/data/siteConfig'
import { useLanguage } from '@/i18n/LanguageContext'
import { LanguageSwitch } from '@/components/ui/LanguageSwitch'
import { Logo } from '@/components/ui/Logo'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { cn } from '@/lib/utils'
import { easeLuxe } from '@/lib/motion'

export function Header() {
  const { t } = useLanguage()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-luxe',
          open
            ? 'border-b border-ivory/10 bg-ink py-3'
            : scrolled
              ? 'border-b border-ivory/10 bg-ink/90 py-3 backdrop-blur-md'
              : 'py-6',
        )}
      >
        <div className="container-luxe flex items-center justify-between">
          <Link
            to="/"
            className="-my-1 shrink-0 py-1 transition-opacity duration-300 hover:opacity-80"
            aria-label={t.common.homeLabel(siteConfig.name)}
          >
            <Logo />
          </Link>

          <div className="hidden items-center gap-7 md:flex lg:gap-10">
            <nav aria-label="Main">
              <ul className="flex items-center gap-7 lg:gap-10">
                {navItems.map((item) => (
                  <li key={item.to}>
                    <NavLink
                      to={item.to}
                      end={item.to === '/'}
                      className={({ isActive }) =>
                        cn(
                          'relative py-2 text-[0.72rem] font-medium tracking-[0.28em] uppercase transition-colors duration-300',
                          isActive ? 'text-gold' : 'text-ivory/75 hover:text-ivory',
                        )
                      }
                    >
                      {({ isActive }) => (
                        <>
                          {t.nav[item.key]}
                          {isActive && (
                            <motion.span
                              layoutId="nav-underline"
                              className="absolute inset-x-0 -bottom-0.5 h-px bg-gold"
                              transition={{ duration: 0.5, ease: easeLuxe }}
                            />
                          )}
                        </>
                      )}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="flex items-center gap-3 border-l border-ivory/15 pl-6 lg:pl-8">
              <LanguageSwitch />
              <ThemeToggle />
            </div>
          </div>

          <div className="flex items-center gap-1.5 md:hidden">
            <LanguageSwitch className="mr-1" />
            <ThemeToggle />
            <button
              type="button"
              className="-mr-2 flex h-11 w-11 items-center justify-center text-ivory"
              aria-label={open ? t.common.menuClose : t.common.menuOpen}
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X size={24} strokeWidth={1.25} /> : <Menu size={24} strokeWidth={1.25} />}
            </button>
          </div>
        </div>
      </header>

      {/*
        Rendered outside <header>: the header's backdrop-filter would otherwise become the
        containing block for this fixed overlay and collapse it to the header's height.
      */}
      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-nav"
            aria-label="Mobile"
            className="fixed inset-0 z-40 overflow-y-auto bg-ink pt-24 pb-12 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <ul className="container-luxe flex flex-col gap-2 pt-8">
              {navItems.map((item, i) => (
                <motion.li
                  key={item.to}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 * i + 0.1, duration: 0.6, ease: easeLuxe }}
                >
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      cn('block border-b border-ivory/10 py-5 font-display text-4xl', isActive ? 'text-gold' : 'text-ivory')
                    }
                  >
                    {t.nav[item.key]}
                  </NavLink>
                </motion.li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  )
}
