import type { ComputedRef } from 'vue'

export enum NotificationCenterTab {
  ALL = 'all',
  UNREAD = 'unread',
}

export interface FormattedQueryResponse<TData> {
  isEmpty: ComputedRef<boolean>
  isLoading: ComputedRef<boolean>
  data: ComputedRef<TData>
  nextPage: () => Promise<void>
}
