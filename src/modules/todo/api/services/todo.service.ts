import type {
  PaginatedData,
  PaginationOptions,
} from '@wisemen/vue-core-components'
import { PaginationParamsBuilder } from '@wisemen/vue-core-components'
import type { Result } from 'neverthrow'
import { ResultAsync } from 'neverthrow'

import {
  createTodoV1,
  getTodosV1,
} from '@/client'
import type { TodoCreateForm } from '@/models/todo/create/todoCreateForm.model'
import type { TodoIndex } from '@/models/todo/index/todoIndex.model'
import type { TodoIndexPagination } from '@/models/todo/index/todoIndexPagination.model'
import {
  TodoCreateTransformer,
  TodoIndexPaginationTransformer,
  TodoIndexTransformer,
} from '@/models/todo/todo.transformer'
import type { TodoUuid } from '@/models/todo/todoUuid.model'

export class TodoService {
  static async create(form: TodoCreateForm): Promise<Result<TodoUuid, Error>> {
    const dto = TodoCreateTransformer.toDto(form)
    const response = await ResultAsync.fromPromise(createTodoV1({
      body: dto,
    }), () => new Error('Failed to create todo'))

    return response.map((res) => res.data.uuid as TodoUuid)
  }

  static async getAll(
    paginationOptions: PaginationOptions<TodoIndexPagination>,
  ): Promise<PaginatedData<TodoIndex>> {
    const query = new PaginationParamsBuilder(paginationOptions)
      .build(TodoIndexPaginationTransformer.toDto)

    const response = await getTodosV1({
      query,
    })

    return {
      data: response.data.items.map(TodoIndexTransformer.fromDto),
      meta: response.data.meta,
    }
  }
}
