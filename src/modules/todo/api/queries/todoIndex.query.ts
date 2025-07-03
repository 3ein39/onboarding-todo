import type { PaginationOptions } from '@wisemen/vue-core-components'
import { useQuery } from '@wisemen/vue-core-query'
import type { ComputedRef } from 'vue'

import type { TodoIndexPagination } from '@/models/todo/index/todoIndexPagination.model'
import { TodoService } from '@/modules/todo/api/services/todo.service'

export function useTodoIndexQuery(
  paginationOptions: ComputedRef<PaginationOptions<TodoIndexPagination>>,
) {
  return useQuery({
    queryFn: () => {
      return TodoService.getAll(paginationOptions.value)
    },
    queryKey: {
      todoIndex: {
        paginationOptions,
      },
    },
  })
}
