import { useMutation } from '@wisemen/vue-core-query'

import type { TodoUuid } from '@/models/todo/todoUuid.model'
import type { TodoUpdateForm } from '@/models/todo/update/todoUpdateForm.model'
import { TodoService } from '@/modules/todo/api/services/todo.service'

interface Params {
  todoUuid: TodoUuid
}

export function useTodoUpdateMutation() {
  return useMutation({
    queryFn: async (queryOptions: {
      body: TodoUpdateForm
      params: Params
    }) => {
      return await TodoService.update(queryOptions.params.todoUuid, queryOptions.body)
    },
    queryKeysToInvalidate: {
      todoIndex: {},
    },
  })
}
