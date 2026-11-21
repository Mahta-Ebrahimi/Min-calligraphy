import { cn } from '@/lib/utils'

/** A small gilded divider inspired by manuscript illumination. */
export function Ornament({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center justify-center gap-3 text-gold', className)} aria-hidden="true">
      <span className="h-px w-12 bg-gradient-to-r from-transparent to-gold/70" />
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M12 2l2.6 7.4L22 12l-7.4 2.6L12 22l-2.6-7.4L2 12l7.4-2.6z" fill="currentColor" opacity="0.9" />
        <circle cx="12" cy="12" r="2" className="fill-ink" />
      </svg>
      <span className="h-px w-12 bg-gradient-to-l from-transparent to-gold/70" />
    </div>
  )
}
