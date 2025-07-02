import { z } from 'zod'

import { addressFormSchema } from '@/models/address/addressForm.model.ts'
import { calendarDateSchema } from '@/models/date/calendarDate.model.ts'

export const contactCreateFormSchema = z.object({
  birthDate: calendarDateSchema,
  address: addressFormSchema.nullable(),
  email: z.string().email().nullable(),
  firstName: z.string().nullable(),
  lastName: z.string().nullable(),
  phone: z.string().nullable(),
})

export type ContactCreateForm = z.infer<typeof contactCreateFormSchema>
