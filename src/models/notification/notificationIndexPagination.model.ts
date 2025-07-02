import type { BasePagination } from '@wisemen/vue-core-components'

export interface NotificationIndexPagination extends BasePagination {
  filter: {
    onlyUnread?: boolean
  }
}
