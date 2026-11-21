import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { artworks, usedCategories } from '@/data/artworks'
import { usePageMeta } from '@/hooks/usePageMeta'
import { useLanguage } from '@/i18n/LanguageContext'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ArtworkCard } from '@/components/gallery/ArtworkCard'
import { GalleryFilters, type AvailabilityFilter, type CategoryFilter } from '@/components/gallery/GalleryFilters'
import { Button } from '@/components/ui/Button'
import type { Category } from '@/types'

const showAvailability = artworks.some((a) => a.availability)

export default function Gallery() {
  const { t } = useLanguage()
  usePageMeta(t.gallery.metaTitle, t.gallery.metaDesc)

  const [params, setParams] = useSearchParams()
  const paramCategory = params.get('category')
  const category: CategoryFilter = usedCategories.includes(paramCategory as Category) ? (paramCategory as Category) : 'All'
  const [availability, setAvailability] = useState<AvailabilityFilter>('all')
  const [query, setQuery] = useState('')

  const setCategory = (next: CategoryFilter) => {
    setParams(next === 'All' ? {} : { category: next }, { replace: true, preventScrollReset: true })
  }

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    // Search matches both languages, so a Danish visitor can also find English titles and vice versa.
    return artworks.filter(
      (a) =>
        (category === 'All' || a.category === category) &&
        (availability === 'all' || a.availability === availability) &&
        (!q ||
          [...Object.values(a.title), ...Object.values(a.description), a.category].some((s) => s.toLowerCase().includes(q))),
    )
  }, [category, availability, query])

  const clear = () => {
    setCategory('All')
    setAvailability('all')
    setQuery('')
  }

  return (
    <div className="pt-32 pb-24 sm:pt-44 sm:pb-32">
      <div className="container-luxe">
        <SectionHeading as="h1" eyebrow={t.gallery.eyebrow} title={t.gallery.title} intro={t.gallery.intro} />

        <div className="mt-10 sm:mt-14">
          <GalleryFilters
            category={category}
            onCategoryChange={setCategory}
            availability={availability}
            onAvailabilityChange={setAvailability}
            showAvailability={showAvailability}
            query={query}
            onQueryChange={setQuery}
          />
        </div>

        <p className="mt-6 text-xs tracking-[0.2em] text-ivory/45 uppercase" aria-live="polite">
          {t.gallery.count(results.length)}
        </p>

        <motion.div layout className="mt-8 grid gap-x-6 gap-y-14 sm:grid-cols-2 sm:gap-y-16 lg:grid-cols-3 lg:gap-x-10">
          <AnimatePresence mode="popLayout">
            {results.map((artwork) => (
              <ArtworkCard key={artwork.id} artwork={artwork} />
            ))}
          </AnimatePresence>
        </motion.div>

        {results.length === 0 && (
          <div className="py-24 text-center">
            <p className="font-display text-3xl text-ivory/80">{t.gallery.empty}</p>
            <Button variant="outline" className="mt-8" onClick={clear}>
              {t.gallery.clear}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
