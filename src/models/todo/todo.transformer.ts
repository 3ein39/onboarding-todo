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
