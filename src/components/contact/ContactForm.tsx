import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Send } from 'lucide-react'
import { contactSchema, hasFormBackend, submitForm, type ContactValues } from '@/lib/forms'
import { useLanguage } from '@/i18n/LanguageContext'
import { Button } from '@/components/ui/Button'
import { FormField, Honeypot } from './FormField'
import { FormStatus, type FormState } from './FormStatus'

export function ContactForm({ defaultSubject = '' }: { defaultSubject?: string }) {
  const { lang, t } = useLanguage()
  const [state, setState] = useState<FormState>({ status: 'idle' })
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: '', email: '', subject: defaultSubject, message: '', company: '' },
  })

  const onSubmit = async (values: ContactValues) => {
    try {
      const result = await submitForm('Contact', values, lang)
      setState({ status: result.mode })
      if (result.mode === 'sent') reset()
    } catch {
      setState({ status: 'error' })
    }
  }

  const describe = (id: keyof ContactValues) => ({ 'aria-describedby': `${id}-error`, 'aria-invalid': Boolean(errors[id]) })

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="relative">
      <Honeypot register={register('company')} />
      <div className="grid gap-x-6 gap-y-2 sm:grid-cols-2">
        <FormField id="name" label={t.form.name} error={errors.name}>
          <input id="name" autoComplete="name" className="field" {...describe('name')} {...register('name')} />
        </FormField>
        <FormField id="email" label={t.form.email} error={errors.email}>
          <input id="email" type="email" autoComplete="email" className="field" {...describe('email')} {...register('email')} />
        </FormField>
        <FormField id="subject" label={t.form.subject} error={errors.subject} className="sm:col-span-2">
          <input id="subject" className="field" {...describe('subject')} {...register('subject')} />
        </FormField>
        <FormField id="message" label={t.form.message} error={errors.message} className="sm:col-span-2">
          <textarea id="message" rows={6} className="field resize-y" {...describe('message')} {...register('message')} />
        </FormField>
      </div>
      <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-stone">{hasFormBackend ? t.form.privacyNote : t.form.mailtoNote}</p>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? t.form.sending : hasFormBackend ? t.form.send : t.form.continueEmail}
          <Send size={14} strokeWidth={1.5} aria-hidden="true" />
        </Button>
      </div>
      <FormStatus state={state} />
    </form>
  )
}
