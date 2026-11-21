import { motion } from 'motion/react'
import { Search } from 'lucide-react'
import type { Availability, Category } from '@/types'
import { usedCategories } from '@/data/artworks'
import { useLanguage } from '@/i18n/LanguageContext'
import { cn } from '@/lib/utils'
import { easeLuxe } from '@/lib/motion'

export type CategoryFilter = Category | 'All'
export type AvailabilityFilter = Availability | 'all'

interface GalleryFiltersProps {
  category: CategoryFilter
  onCategoryChange: (category: CategoryFilter) => void
  availability: AvailabilityFilter
  onAvailabilityChange: (value: AvailabilityFilter) => void
  /** Hidden until at least one artwork has its availability filled in. */
  showAvailability: boolean
  query: string
  onQueryChange: (value: string) => void
}

export function GalleryFilters({
  category,
  onCategoryChange,
  availability,
  onAvailabilityChange,
  showAvailability,
  query,
  onQueryChange,
}: GalleryFiltersProps) {
  const { t } = useLanguage()
  const options: CategoryFilter[] = ['All', ...usedCategories]

  return (
    <div className="flex flex-col gap-4 border-y border-ivory/10 py-5 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
      {/* One swipeable row on phones; wraps on larger screens. */}
      <div
        role="group"
        aria-label={t.gallery.filterByCategory}
        className="no-scrollbar -mx-5 flex gap-1 overflow-x-auto px-4 sm:-mx-1 sm:flex-wrap sm:overflow-visible sm:px-0"
      >
        {options.map((option) => {
          const active = category === option
          return (
            <button
              key={option}
              type="button"
              aria-pressed={active}
              onClick={() => onCategoryChange(option)}
              className={cn(
                'relative shrink-0 px-4 py-2.5 text-[0.68rem] font-medium tracking-[0.2em] whitespace-nowrap uppercase transition-colors duration-300',
                active ? 'text-on-gold' : 'text-ivory/65 hover:text-ivory',
              )}
            >
              {active && (
                <motion.span
                  layoutId="filter-pill"
                  className="absolute inset-0 bg-gold"
                  transition={{ duration: 0.5, ease: easeLuxe }}
                />
              )}
              <span className="relative">{option === 'All' ? t.gallery.all : t.categories[option]}</span>
            </button>
          )
        })}
      </div>

      <div className="flex gap-3">
        <label className="relative block min-w-0 flex-1 lg:flex-none">
          <span className="sr-only">{t.gallery.search}</span>
          <Search
            size={16}
            strokeWidth={1.25}
            className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-stone"
            aria-hidden="true"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder={t.gallery.searchPlaceholder}
            className="field py-2.5 pl-11 text-sm lg:w-60"
          />
        </label>
        {showAvailability && (
          <label className="block w-[42%] shrink-0 sm:w-44">
            <span className="sr-only">{t.gallery.availabilityLabel}</span>
            <select
              value={availability}
              onChange={(e) => onAvailabilityChange(e.target.value as AvailabilityFilter)}
              className="field py-2.5 text-sm"
            >
              <option value="all">{t.gallery.allWorks}</option>
              <option value="available">{t.gallery.available}</option>
              <option value="sold">{t.gallery.sold}</option>
              <option value="commission">{t.gallery.commissions}</option>
            </select>
          </label>
        )}
      </div>
    </div>
  )
}
