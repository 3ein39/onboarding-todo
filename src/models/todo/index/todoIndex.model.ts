import type { CalendarDate } from '@/models/date/calendarDate.model'
import type { TodoUuid } from '@/models/todo/todoUuid.model'

export interface TodoIndex {
  uuid: TodoUuid
  title: string
  createdAt: string
  dueDate: CalendarDate | null
  updatedAt: string
  isCompleted: boolean
  description: string | null
}
