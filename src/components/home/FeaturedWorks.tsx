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

        {/* Two by two on phones and tablets, one evenly hung row on large screens. */}
        <div className="mt-14 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-8 sm:gap-y-14 lg:mt-16 lg:grid-cols-4">
          {featuredArtworks.map((artwork, i) => (
            <Reveal key={artwork.slug} delay={(i % 4) * 0.08}>
              <ArtworkCard artwork={artwork} compact />
            </Reveal>
          ))}
        </div>

        <div className="mt-10 md:hidden">
          <LinkButton to="/gallery" variant="outline" className="w-full">
            {t.featured.viewAll} <ArrowRight size={16} />
          </LinkButton>
        </div>
      </div>
    </section>
  )
}
