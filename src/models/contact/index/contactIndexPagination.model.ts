import type { BasePagination } from '@wisemen/vue-core-components'

import type { ViewContactIndexSortQueryKey } from '@/client'

export type ContactIndexPagination = BasePagination<{
  filter: {
    isActive?: boolean
  }
  sort: ViewContactIndexSortQueryKey
}>
