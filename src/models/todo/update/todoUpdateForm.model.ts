import { z } from 'zod'

export const todoUpdateFormSchema = z.object({
  title: z.string().min(1),
  deadline: z.date().nullable(),
  description: z.string().nullable(),
})

export type TodoUpdateForm = z.infer<typeof todoUpdateFormSchema>
