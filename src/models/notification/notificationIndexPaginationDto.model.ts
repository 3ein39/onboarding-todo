import type { BasePagination } from '@wisemen/vue-core-components'

import type { GetMyNotificationsFilterQuery } from '@/client'

export interface NotificationIndexPaginationDto extends BasePagination {
  filter: GetMyNotificationsFilterQuery
}
