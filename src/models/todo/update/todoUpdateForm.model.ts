import { z } from 'zod'

import { calendarDateSchema } from '@/models/date/calendarDate.model'

export const todoUpdateFormSchema = z.object({
  title: z.string().min(1),
  deadline: calendarDateSchema.nullable(),
  description: z.string().nullable(),
})

export type TodoUpdateForm = z.infer<typeof todoUpdateFormSchema>
