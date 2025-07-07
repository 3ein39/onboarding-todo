import { useQueryClient } from '@tanstack/vue-query'
import type { PaginatedData } from '@wisemen/vue-core-components'
import { useMutation } from '@wisemen/vue-core-query'

import type { TodoIndex } from '@/models/todo/index/todoIndex.model'
import type { TodoUuid } from '@/models/todo/todoUuid.model'
import { TodoService } from '@/modules/todo/api/services/todo.service'

interface Params {
  todoUuid: TodoUuid
  isCompleted: boolean
}

export function useTodoToggleCompletionMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    queryFn: async (queryOptions: { params: Params }) => {
      const {
        todoUuid, isCompleted,
      } = queryOptions.params

      queryClient.setQueriesData(
        {
          queryKey: [
            'todoIndex',
          ],
        },
        (old: PaginatedData<TodoIndex> | undefined) => {
          if (!old)
            return old

          return {
            ...old,
            data: old.data.map((todo) =>
              todo.uuid === todoUuid
                ? {
                    ...todo,
                    isCompleted,
                  }
                : todo),
          }
        },
      )

      if (isCompleted) {
        return await TodoService.checkTodo(todoUuid)
      }
      else {
        return await TodoService.uncheckTodo(todoUuid)
      }
    },
    queryKeysToInvalidate: {
      todoIndex: {},
    },
  })
}
