import { z } from 'zod'

export const calendarDateDtoSchema = z.string().date()

export type CalendarDateDto = z.infer<typeof calendarDateDtoSchema>
