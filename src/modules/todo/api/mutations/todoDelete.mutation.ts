import { useMutation } from '@wisemen/vue-core-query'

import type { TodoUuid } from '@/models/todo/todoUuid.model'
import { TodoService } from '@/modules/todo/api/services/todo.service'

interface Params {
  todoUuid: TodoUuid
}

export function useTodoDeleteMutation() {
  return useMutation({
    queryFn: async (queryOptions: { params: Params }) => {
      return await TodoService.deleteByUuid(queryOptions.params.todoUuid)
    },
    queryKeysToInvalidate: {
      todoIndex: {},
    },
  })
}
