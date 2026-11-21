import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'

type Variant = 'gold' | 'outline' | 'ghost'

const base =
  'group inline-flex items-center justify-center gap-3 whitespace-nowrap px-8 py-4 text-[0.7rem] font-medium tracking-[0.22em] uppercase transition-all duration-500 ease-luxe disabled:cursor-not-allowed disabled:opacity-50'

const variants: Record<Variant, string> = {
  gold: 'bg-gold text-on-gold hover:bg-ivory hover:text-ink',
  outline: 'border border-gold/60 text-gold hover:border-gold hover:bg-gold hover:text-on-gold',
  ghost: 'px-0 text-ivory/80 hover:text-gold',
}

interface LinkButtonProps {
  to: string
  variant?: Variant
  className?: string
  children: ReactNode
}

export function LinkButton({ to, variant = 'gold', className, children }: LinkButtonProps) {
  return (
    <Link to={to} className={cn(base, variants[variant], className)}>
      {children}
    </Link>
  )
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
}

export function Button({ variant = 'gold', className, children, ...props }: ButtonProps) {
  return (
    <button className={cn(base, variants[variant], className)} {...props}>
      {children}
    </button>
  )
}
