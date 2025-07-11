import type { TodoIndexDto } from '@/models/todo/index/todoIndexDto.model'
import { UuidUtil } from '@/utils/uuid.util'

export class TodoIndexDtoBuilder {
  value: TodoIndexDto = {
    uuid: UuidUtil.getRandom(),
    title: 'Sample Todo',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    completed: false,
    deadline: null,
    description: null,
  }

  build(): TodoIndexDto {
    return this.value
  }

  withCompleted(completed: boolean): TodoIndexDtoBuilder {
    this.value.completed = completed

    return this
  }

  withDeadline(deadline: Date): TodoIndexDtoBuilder {
    this.value.deadline = deadline.toISOString()

    return this
  }

  withDescription(description: string): TodoIndexDtoBuilder {
    this.value.description = description

    return this
  }

  withTitle(title: string): TodoIndexDtoBuilder {
    this.value.title = title

    return this
  }
}
