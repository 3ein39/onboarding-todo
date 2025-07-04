import { z } from 'zod'

import { calendarDateSchema } from '@/models/date/calendarDate.model'

export const todoCreateFormSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  deadline: calendarDateSchema.nullable(),
  description: z.string().nullable(),
})

export type TodoCreateForm = z.infer<typeof todoCreateFormSchema>
