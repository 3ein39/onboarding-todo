import { z } from 'zod'

export const calendarDateSchema = z.date()

export type CalendarDate = z.infer<typeof calendarDateSchema>
