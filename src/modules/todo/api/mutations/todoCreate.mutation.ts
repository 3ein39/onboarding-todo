import { useMutation } from '@wisemen/vue-core-query'

import type { TodoCreateForm } from '@/models/todo/create/todoCreateForm.model'
import { TodoService } from '@/modules/todo/api/services/todo.service'

export function useTodoCreateMutation() {
  return useMutation({
    queryFn: async (queryOptions: { body: TodoCreateForm }) => {
      return await TodoService.create(queryOptions.body)
    },
    queryKeysToInvalidate: {
      todoIndex: {},
    },
  })
}
