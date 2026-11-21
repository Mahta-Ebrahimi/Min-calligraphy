import { ArrowRight } from 'lucide-react'
import { featuredArtworks } from '@/data/artworks'
import { useLanguage } from '@/i18n/LanguageContext'
import { ArtworkCard } from '@/components/gallery/ArtworkCard'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { LinkButton } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Reveal'

export function FeaturedWorks() {
  const { t } = useLanguage()

  return (
    <section id="featured" className="scroll-mt-24 py-24 sm:py-32">
      <div className="container-luxe">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading eyebrow={t.featured.eyebrow} title={t.featured.title} intro={t.featured.intro} />
          <Reveal className="hidden md:block">
            <LinkButton to="/gallery" variant="ghost">
              {t.featured.viewAll} <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </LinkButton>
          </Reveal>
        </div>

        {/*
          A swipeable row on phones (the next piece peeks in to show it scrolls);
          an evenly hung row on large screens. Revealed as one unit so peeking cards are visible.
        */}
        <Reveal className="no-scrollbar -mx-5 mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-px-5 px-5 pb-2 sm:-mx-8 sm:scroll-px-8 sm:px-8 lg:mx-0 lg:mt-16 lg:grid lg:grid-cols-4 lg:gap-8 lg:overflow-visible lg:px-0">
          {featuredArtworks.map((artwork) => (
            <div key={artwork.slug} className="w-[78%] shrink-0 snap-start sm:w-[44%] lg:w-auto">
              <ArtworkCard artwork={artwork} />
            </div>
          ))}
        </Reveal>

        <div className="mt-10 md:hidden">
          <LinkButton to="/gallery" variant="outline" className="w-full">
            {t.featured.viewAll} <ArrowRight size={16} />
          </LinkButton>
        </div>
      </div>
    </section>
  )
}
