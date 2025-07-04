import type { TodoCreateDto } from '@/models/todo/create/todoCreateDto.model'
import type { TodoCreateForm } from '@/models/todo/create/todoCreateForm.model'
import type { TodoIndex } from '@/models/todo/index/todoIndex.model'
import type { TodoIndexDto } from '@/models/todo/index/todoIndexDto.model'
import type { TodoIndexPagination } from '@/models/todo/index/todoIndexPagination.model'
import type { TodoIndexPaginationDto } from '@/models/todo/index/todoIndexPaginationDto.model'
import type { TodoUuid } from '@/models/todo/todoUuid.model'

export class TodoIndexTransformer {
  static fromDto(dto: TodoIndexDto): TodoIndex {
    return {
      uuid: dto.uuid as TodoUuid,
      title: dto.title,
      createdAt: dto.createdAt,
      dueDate: dto.deadline,
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
  private static formatDateToYYYYMMDD(date: Date): string {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')

    return `${year}-${month}-${day}`
  }

  static toDto(form: TodoCreateForm): TodoCreateDto {
    return {
      title: form.title,
      deadline: form.deadline ? TodoCreateTransformer.formatDateToYYYYMMDD(form.deadline) : null,
      description: form.description,
    }
  }
}
