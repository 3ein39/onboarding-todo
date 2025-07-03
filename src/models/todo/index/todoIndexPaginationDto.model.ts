import type { BasePagination } from '@wisemen/vue-core-components'

import type { GetTodosSortQuery } from '@/client'

export type TodoIndexPaginationDto = BasePagination<{
  filter: {
    isCompleted?: string
  }
  sort: GetTodosSortQuery['key']
}>
