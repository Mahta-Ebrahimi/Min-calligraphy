import type { ReactNode } from 'react'
import type { FieldError, UseFormRegisterReturn } from 'react-hook-form'
import { useLanguage } from '@/i18n/LanguageContext'
import { cn } from '@/lib/utils'

interface FormFieldProps {
  id: string
  label: string
  error?: FieldError
  optional?: boolean
  className?: string
  children: ReactNode
}

/** Label + control + accessible error message. The control must use `id` and `aria-describedby={`${id}-error`}`. */
export function FormField({ id, label, error, optional, className, children }: FormFieldProps) {
  const { t } = useLanguage()

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <label htmlFor={id} className="text-[0.7rem] font-medium tracking-[0.22em] text-ivory/70 uppercase">
        {label}
        {optional && <span className="ml-2 tracking-normal text-stone normal-case">({t.form.optional})</span>}
      </label>
      {children}
      <ErrorText id={`${id}-error`} error={error} />
    </div>
  )
}

/** Shows a validation message; schema messages are keys into the `errors` translations. */
export function ErrorText({ id, error }: { id: string; error?: FieldError }) {
  const { t } = useLanguage()
  const message = error?.message
  const text = message ? (t.errors[message as keyof typeof t.errors] ?? message) : ''

  return (
    <p id={id} role="alert" className="min-h-5 text-sm text-error">
      {text}
    </p>
  )
}

/** Hidden field that bots tend to fill in; real visitors never see it. */
export function Honeypot({ register }: { register: UseFormRegisterReturn }) {
  return (
    <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
      <label>
        Company
        <input type="text" tabIndex={-1} autoComplete="off" {...register} />
      </label>
    </div>
  )
}
