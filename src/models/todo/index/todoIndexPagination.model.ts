import type { BasePagination } from '@wisemen/vue-core-components'

import type { GetTodosSortQuery } from '@/client'

export type TodoIndexPagination = BasePagination<{
  filter: {
    isCompleted?: boolean
  }
  sort: GetTodosSortQuery['key']
}>
