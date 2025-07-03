import type {
  PaginatedData,
  PaginationOptions,
} from '@wisemen/vue-core-components'
import { PaginationParamsBuilder } from '@wisemen/vue-core-components'

import { getTodosV1 } from '@/client'
import type { TodoIndex } from '@/models/todo/index/todoIndex.model'
import type { TodoIndexPagination } from '@/models/todo/index/todoIndexPagination.model'
import {
  TodoIndexPaginationTransformer,
  TodoIndexTransformer,
} from '@/models/todo/todo.transformer'

export class TodoService {
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
