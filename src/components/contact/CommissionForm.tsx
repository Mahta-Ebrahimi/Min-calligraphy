import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Feather } from 'lucide-react'
import {
  budgetRanges,
  commissionSchema,
  commissionTypes,
  hasFormBackend,
  submitForm,
  type CommissionValues,
} from '@/lib/forms'
import { useLanguage } from '@/i18n/LanguageContext'
import { Button } from '@/components/ui/Button'
import { ErrorText, FormField, Honeypot } from './FormField'
import { FormStatus, type FormState } from './FormStatus'

export function CommissionForm({ defaultDetails = '' }: { defaultDetails?: string }) {
  const { lang, t } = useLanguage()
  const [state, setState] = useState<FormState>({ status: 'idle' })
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CommissionValues>({
    resolver: zodResolver(commissionSchema),
    defaultValues: { name: '', email: '', text: '', size: '', deadline: '', details: defaultDetails, company: '' },
  })

  const onSubmit = async (values: CommissionValues) => {
    try {
      const result = await submitForm('Commission', values, lang)
      setState({ status: result.mode })
      if (result.mode === 'sent') reset()
    } catch {
      setState({ status: 'error' })
    }
  }

  const a11y = (field: keyof CommissionValues, id: string) => ({
    id,
    'aria-describedby': `${id}-error`,
    'aria-invalid': Boolean(errors[field]),
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="relative">
      <Honeypot register={register('company')} />
      <div className="grid gap-x-6 gap-y-2 sm:grid-cols-2">
        <FormField id="c-name" label={t.form.name} error={errors.name}>
          <input autoComplete="name" className="field" {...a11y('name', 'c-name')} {...register('name')} />
        </FormField>
        <FormField id="c-email" label={t.form.email} error={errors.email}>
          <input type="email" autoComplete="email" className="field" {...a11y('email', 'c-email')} {...register('email')} />
        </FormField>
        <FormField id="c-type" label={t.form.type} error={errors.commissionType}>
          <select className="field" defaultValue="" {...a11y('commissionType', 'c-type')} {...register('commissionType')}>
            <option value="" disabled>
              {t.form.choose}
            </option>
            {commissionTypes.map((value) => (
              <option key={value} value={value}>
                {t.form.commissionTypes[value]}
              </option>
            ))}
          </select>
        </FormField>
        <FormField id="c-budget" label={t.form.budget} error={errors.budget}>
          <select className="field" defaultValue="" {...a11y('budget', 'c-budget')} {...register('budget')}>
            <option value="" disabled>
              {t.form.choose}
            </option>
            {budgetRanges.map((value) => (
              <option key={value} value={value}>
                {t.form.budgets[value]}
              </option>
            ))}
          </select>
        </FormField>
        <FormField id="c-text" label={t.form.words} error={errors.text} className="sm:col-span-2">
          <textarea
            rows={3}
            dir="auto"
            placeholder={t.form.wordsPlaceholder}
            className="field resize-y"
            {...a11y('text', 'c-text')}
            {...register('text')}
          />
        </FormField>
        <FormField id="c-size" label={t.form.size} error={errors.size} optional>
          <input placeholder={t.form.sizePlaceholder} className="field" {...a11y('size', 'c-size')} {...register('size')} />
        </FormField>
        <FormField id="c-deadline" label={t.form.date} error={errors.deadline} optional>
          <input
            type="date"
            lang={lang}
            className="field"
            {...a11y('deadline', 'c-deadline')}
            {...register('deadline')}
          />
        </FormField>
        <FormField id="c-details" label={t.form.details} error={errors.details} optional className="sm:col-span-2">
          <textarea
            rows={4}
            placeholder={t.form.detailsPlaceholder}
            className="field resize-y"
            {...a11y('details', 'c-details')}
            {...register('details')}
          />
        </FormField>

        <div className="sm:col-span-2">
          <label htmlFor="c-consent" className="flex cursor-pointer items-start gap-3 text-sm text-ivory/70">
            <input type="checkbox" className="mt-1 h-4 w-4 accent-gold" {...a11y('consent', 'c-consent')} {...register('consent')} />
            {t.form.consent}
          </label>
          <div className="mt-2">
            <ErrorText id="c-consent-error" error={errors.consent} />
          </div>
        </div>
      </div>

      <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-stone">{hasFormBackend ? t.form.paymentNote : t.form.mailtoNote}</p>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? t.form.sending : hasFormBackend ? t.form.sendRequest : t.form.continueEmail}
          <Feather size={14} strokeWidth={1.5} aria-hidden="true" />
        </Button>
      </div>
      <FormStatus state={state} />
    </form>
  )
}
