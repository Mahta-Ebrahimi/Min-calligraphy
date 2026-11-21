import { usePageMeta } from '@/hooks/usePageMeta'
import { siteConfig } from '@/data/siteConfig'
import { useLanguage } from '@/i18n/LanguageContext'
import { ArtistIntro } from '@/components/about/ArtistIntro'
import { Timeline } from '@/components/about/Timeline'
import { Materials } from '@/components/about/Materials'
import { CommissionCTA } from '@/components/home/CommissionCTA'

export default function About() {
  const { lang, t } = useLanguage()
  usePageMeta(t.about.metaTitle, `${siteConfig.artist.intro[lang]} ${t.about.metaDesc}`)

  return (
    <>
      <ArtistIntro />
      <Timeline />
      <Materials />
      <CommissionCTA />
    </>
  )
}
