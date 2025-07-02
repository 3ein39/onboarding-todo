import type { BasePagination } from '@wisemen/vue-core-components'

import type {
  ViewContactIndexFilterQuery,
  ViewContactIndexSortQueryKey,
} from '@/client'

export type ContactIndexPaginationDto = BasePagination<{
  filter: ViewContactIndexFilterQuery
  sort: ViewContactIndexSortQueryKey
}>
