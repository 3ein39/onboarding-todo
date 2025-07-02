import { z } from 'zod'

import { addressFormSchema } from '@/models/address/addressForm.model.ts'
import { calendarDateSchema } from '@/models/date/calendarDate.model.ts'
import { s3FileFormSchema } from '@/models/s3-file/s3FileForm.model.ts'

export const contactUpdateFormSchema = z.object({
  birthDate: calendarDateSchema,
  isActive: z.boolean(),
  address: addressFormSchema,
  email: z.string().email().nullable(),
  file: s3FileFormSchema.nullable(),
  firstName: z.string().nullable(),
  lastName: z.string().nullable(),
  phone: z.string().nullable(),
})

export type ContactUpdateForm = z.infer<typeof contactUpdateFormSchema>
