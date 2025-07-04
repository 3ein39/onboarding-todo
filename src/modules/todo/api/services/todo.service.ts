import type {
  PaginatedData,
  PaginationOptions,
} from '@wisemen/vue-core-components'
import { PaginationParamsBuilder } from '@wisemen/vue-core-components'
import type { Result } from 'neverthrow'
import { ResultAsync } from 'neverthrow'

import {
  checkTodoV1,
  createTodoV1,
  deleteTodoV1,
  getTodosV1,
  uncheckTodoV1,
  updateTodoV1,
} from '@/client'
import type { TodoCreateForm } from '@/models/todo/create/todoCreateForm.model'
import type { TodoIndex } from '@/models/todo/index/todoIndex.model'
import type { TodoIndexPagination } from '@/models/todo/index/todoIndexPagination.model'
import {
  TodoCreateTransformer,
  TodoIndexPaginationTransformer,
  TodoIndexTransformer,
  TodoUpdateTransformer,
} from '@/models/todo/todo.transformer'
import type { TodoUuid } from '@/models/todo/todoUuid.model'
import type { TodoUpdateForm } from '@/models/todo/update/todoUpdateForm.model'

export class TodoService {
  static async checkTodo(todoUuid: TodoUuid): Promise<Result<void, Error>> {
    const response = await ResultAsync.fromPromise(checkTodoV1({
      responseValidator: undefined,
      path: {
        todoUuid,
      },
    }), () => new Error('Failed to check todo'))

    return response.map((res) => res.data as void)
  }

  static async create(form: TodoCreateForm): Promise<Result<TodoUuid, Error>> {
    const dto = TodoCreateTransformer.toDto(form)
    const response = await ResultAsync.fromPromise(createTodoV1({
      body: dto,
    }), () => new Error('Failed to create todo'))

    return response.map((res) => res.data.uuid as TodoUuid)
  }

  static async deleteByUuid(todoUuid: TodoUuid): Promise<Result<void, Error>> {
    const response = await ResultAsync.fromPromise(deleteTodoV1({
      responseValidator: undefined,
      path: {
        todoUuid,
      },
    }), () => new Error('Failed to delete todo'))

    return response.map((res) => res.data as void)
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

  static async uncheckTodo(todoUuid: TodoUuid): Promise<Result<void, Error>> {
    const response = await ResultAsync.fromPromise(uncheckTodoV1({
      responseValidator: undefined,
      path: {
        todoUuid,
      },
    }), () => new Error('Failed to uncheck todo'))

    return response.map((res) => res.data as void)
  }

  static async update(todoUuid: TodoUuid, form: TodoUpdateForm): Promise<Result<void, Error>> {
    const dto = TodoUpdateTransformer.toDto(form)
    const response = await ResultAsync.fromPromise(updateTodoV1({
      body: dto,
      responseValidator: undefined,
      path: {
        todoUuid,
      },
    }), () => new Error('Failed to update todo'))

    return response.map((res) => res.data as void)
  }
}
