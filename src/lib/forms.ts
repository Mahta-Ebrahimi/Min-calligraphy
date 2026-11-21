import { z } from 'zod'
import { siteConfig } from '@/data/siteConfig'

/*
 * Validation messages are keys into the `errors` section of the translation
 * files, so they are shown in whichever language is active when rendered.
 */

export const contactSchema = z.object({
  name: z.string().trim().min(2, 'name').max(100, 'tooLong'),
  email: z.email('email'),
  subject: z.string().trim().min(3, 'subject').max(150, 'tooLong'),
  message: z.string().trim().min(20, 'message').max(4000, 'tooLong'),
  /** Honeypot: real visitors never see or fill this field. */
  company: z.string().max(0).optional(),
})

export type ContactValues = z.infer<typeof contactSchema>

export const commissionTypes = ['Name or monogram', 'Poetry or verse', 'Wedding or gift', 'Corporate / interior', 'Other'] as const
export const budgetRanges = ['Under €500', '€500 – €1,500', '€1,500 – €4,000', '€4,000+', 'Not sure yet'] as const

export const commissionSchema = z.object({
  name: z.string().trim().min(2, 'name').max(100, 'tooLong'),
  email: z.email('email'),
  commissionType: z.enum(commissionTypes, { error: 'commissionType' }),
  text: z.string().trim().min(1, 'text').max(1000, 'tooLong'),
  size: z.string().trim().max(100, 'tooLong').optional(),
  budget: z.enum(budgetRanges, { error: 'budget' }),
  deadline: z.string().optional(),
  details: z.string().trim().max(4000, 'tooLong').optional(),
  consent: z.literal(true, { error: 'consent' }),
  company: z.string().max(0).optional(),
})

export type CommissionValues = z.infer<typeof commissionSchema>

export type SubmitResult = { mode: 'sent' } | { mode: 'mailto' }

const endpoint = import.meta.env.VITE_FORM_ENDPOINT as string | undefined

/** True when a real form backend is configured. */
export const hasFormBackend = Boolean(endpoint)

/**
 * Sends the form to the configured form service (e.g. Formspree) when
 * VITE_FORM_ENDPOINT is set. Otherwise opens the visitor's email app with the
 * message pre-filled — nothing is claimed to be "sent" in that case.
 */
export async function submitForm(
  kind: 'Contact' | 'Commission',
  data: Record<string, unknown>,
  lang: string,
): Promise<SubmitResult> {
  const { company: _honeypot, consent: _consent, ...fields } = data
  const payload = { ...fields, language: lang }

  if (endpoint) {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ _subject: `${kind} enquiry — ${siteConfig.name}`, form: kind, ...payload }),
    })
    if (!res.ok) throw new Error(`Form endpoint responded ${res.status}`)
    return { mode: 'sent' }
  }

  const subject = kind === 'Contact' ? String(fields.subject ?? 'Enquiry') : `Commission request — ${fields.commissionType}`
  const body = Object.entries(payload)
    .filter(([, v]) => v !== undefined && v !== '')
    .map(([k, v]) => `${k.replace(/([A-Z])/g, ' $1').replace(/^./, (c) => c.toUpperCase())}: ${v}`)
    .join('\n')
  window.location.href = `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  return { mode: 'mailto' }
}
