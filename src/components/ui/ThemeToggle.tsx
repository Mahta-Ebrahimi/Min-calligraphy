import { AnimatePresence, motion } from 'motion/react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/theme/ThemeContext'
import { useLanguage } from '@/i18n/LanguageContext'
import { cn } from '@/lib/utils'

/** Sun/moon button that switches between light and dark mode. */
export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme()
  const { t } = useLanguage()
  const label = theme === 'dark' ? t.theme.toLight : t.theme.toDark

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      className={cn(
        'relative flex h-9 w-9 items-center justify-center text-ivory/60 transition-colors duration-300 hover:text-gold',
        className,
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ opacity: 0, rotate: -45, scale: 0.7 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 45, scale: 0.7 }}
          transition={{ duration: 0.25 }}
          className="flex"
        >
          {theme === 'dark' ? <Sun size={17} strokeWidth={1.4} /> : <Moon size={17} strokeWidth={1.4} />}
        </motion.span>
      </AnimatePresence>
    </button>
  )
}
