import { z } from 'zod'

export const todoCreateFormSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  deadline: z.date().nullable(),
  description: z.string().nullable(),
})

export type TodoCreateForm = z.infer<typeof todoCreateFormSchema>
