import { useMutation } from '@wisemen/vue-core-query'

import type { TodoUuid } from '@/models/todo/todoUuid.model'
import { TodoService } from '@/modules/todo/api/services/todo.service'

interface Params {
  todoUuid: TodoUuid
  isCompleted: boolean
}

export function useTodoToggleCompletionMutation() {
  return useMutation({
    queryFn: async (queryOptions: { params: Params }) => {
      const {
        todoUuid, isCompleted,
      } = queryOptions.params

      if (isCompleted) {
        return await TodoService.uncheckTodo(todoUuid)
      }
      else {
        return await TodoService.checkTodo(todoUuid)
      }
    },
    queryKeysToInvalidate: {
      todoIndex: {},
    },
  })
}
