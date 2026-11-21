import { Reveal } from './Reveal'
import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  eyebrow: string
  title: string
  intro?: string
  align?: 'left' | 'center'
  as?: 'h1' | 'h2'
  className?: string
}

export function SectionHeading({ eyebrow, title, intro, align = 'left', as = 'h2', className }: SectionHeadingProps) {
  const Heading = as
  return (
    <Reveal className={cn('max-w-2xl', align === 'center' && 'mx-auto text-center', className)}>
      <p className="eyebrow">{eyebrow}</p>
      <Heading className="mt-4 text-4xl leading-[1.05] text-ivory sm:text-5xl lg:text-6xl">{title}</Heading>
      {intro && <p className="mt-6 text-base leading-relaxed text-ivory/70 sm:text-lg sm:font-light">{intro}</p>}
    </Reveal>
  )
}
