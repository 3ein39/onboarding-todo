import { CalendarDateTransformer } from '@/models/date/calendarDate.transformer'
import type { TodoCreateDto } from '@/models/todo/create/todoCreateDto.model'
import type { TodoCreateForm } from '@/models/todo/create/todoCreateForm.model'
import type { TodoIndex } from '@/models/todo/index/todoIndex.model'
import type { TodoIndexDto } from '@/models/todo/index/todoIndexDto.model'
import type { TodoIndexPagination } from '@/models/todo/index/todoIndexPagination.model'
import type { TodoIndexPaginationDto } from '@/models/todo/index/todoIndexPaginationDto.model'
import type { TodoUuid } from '@/models/todo/todoUuid.model'
import type { TodoUpdateDto } from '@/models/todo/update/todoUpdateDto.model'
import type { TodoUpdateForm } from '@/models/todo/update/todoUpdateForm.model'

export class TodoIndexTransformer {
  static fromDto(dto: TodoIndexDto): TodoIndex {
    return {
      uuid: dto.uuid as TodoUuid,
      title: dto.title,
      createdAt: dto.createdAt,
      dueDate: CalendarDateTransformer.fromNullableDto(dto.deadline),
      updatedAt: dto.updatedAt,
      isCompleted: dto.completed,
      description: dto.description,
    }
  }
}

export class TodoIndexPaginationTransformer {
  static toDto(pagination: TodoIndexPagination): TodoIndexPaginationDto {
    return {
      filter: {
        isCompleted: pagination.filter?.isCompleted !== undefined
          ? String(pagination.filter.isCompleted)
          : undefined,
      },
      sort: pagination.sort,
    }
  }
}

export class TodoCreateTransformer {
  static toDto(form: TodoCreateForm): TodoCreateDto {
    return {
      title: form.title,
      deadline: CalendarDateTransformer.toNullableDto(form.deadline),
      description: form.description,
    }
  }
}

export class TodoUpdateTransformer {
  static toDto(form: TodoUpdateForm): TodoUpdateDto {
    return {
      title: form.title,
      deadline: CalendarDateTransformer.toNullableDto(form.deadline),
      description: form.description,
    }
  }

  static toForm(todo: TodoIndex): TodoUpdateForm {
    return {
      title: todo.title,
      deadline: todo.dueDate,
      description: todo.description,
    }
  }
}
