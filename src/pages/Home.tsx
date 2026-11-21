import { usePageMeta } from '@/hooks/usePageMeta'
import { Hero } from '@/components/home/Hero'
import { FeaturedWorks } from '@/components/home/FeaturedWorks'
import { Philosophy } from '@/components/home/Philosophy'
import { Process } from '@/components/home/Process'
import { CommissionCTA } from '@/components/home/CommissionCTA'

export default function Home() {
  usePageMeta('')

  return (
    <>
      <Hero />
      <FeaturedWorks />
      <Philosophy />
      <Process />
      <CommissionCTA />
    </>
  )
}
