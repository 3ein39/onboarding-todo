import type { TodoUuid } from '@/models/todo/todoUuid.model'

export interface TodoIndex {
  uuid: TodoUuid
  title: string
  createdAt: string
  dueDate: string | null
  updatedAt: string
  isCompleted: boolean
  description: string | null
}
