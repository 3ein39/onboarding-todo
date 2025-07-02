import { usePagination } from '@wisemen/vue-core-components'
import { computed } from 'vue'

import { useNotificationMarkAllAsReadMutation } from '@/api/notification/mutations/notificationMarkAllAsRead.mutation'
import { useNotificationMarkAsReadMutation } from '@/api/notification/mutations/notificationMarkAsRead.mutation'
import { useNotificationIndexQuery } from '@/api/notification/queries/notificationIndex.query'
import { useNotificationUnreadCountQuery } from '@/api/notification/queries/notificationUnreadCount.query'
import { useApiErrorToast } from '@/composables/api-error-toast/apiErrorToast.composable'
import type { NotificationIndex } from '@/models/notification/notificationIndex.model'
import type { NotificationIndexPagination } from '@/models/notification/notificationIndexPagination.model'
import type { NotificationUuid } from '@/models/notification/notificationUuid.model'
import type { FormattedQueryResponse } from '@/modules/notification/features/center/types/notificationCenter.type'

export function useNotificationCenter() {
  const apiErrorToast = useApiErrorToast()

  const unreadNotificationsPagination = usePagination<NotificationIndexPagination>({
    isRouteQueryEnabled: false,
    options: {
      filter: {
        onlyUnread: true,
      },
    },
    type: 'keyset',
  })

  const allNotificationsPagination = usePagination<NotificationIndexPagination>({
    isRouteQueryEnabled: false,
    options: {
      filter: {
        onlyUnread: false,
      },
    },
    type: 'keyset',
  })

  const unreadNotificationsIndexQuery = useNotificationIndexQuery(unreadNotificationsPagination.paginationOptions)
  const allNotificationsIndexQuery = useNotificationIndexQuery(allNotificationsPagination.paginationOptions)
  const unreadNotificationsQuery = useNotificationUnreadCountQuery()

  const markAsReadMutation = useNotificationMarkAsReadMutation()
  const markAllAsReadMutation = useNotificationMarkAllAsReadMutation()

  const unreadCount = computed<number>(() => (
    unreadNotificationsQuery.data.value?.amount ?? 0
  ))

  const formattedUnreadNotifications = computed<FormattedQueryResponse<NotificationIndex[]>>(() => ({
    isEmpty: computed<boolean>(() => unreadNotificationsIndexQuery.data.value.data.length === 0),
    isLoading: computed<boolean>(() => unreadNotificationsIndexQuery.isLoading.value),
    data: computed<NotificationIndex[]>(() => unreadNotificationsIndexQuery.data.value.data ?? []),
    nextPage: unreadNotificationsIndexQuery.getNextPage,
  }))

  const formattedAllNotifications = computed<FormattedQueryResponse<NotificationIndex[]>>(() => ({
    isEmpty: computed<boolean>(() => allNotificationsIndexQuery.data.value.data.length === 0),
    isLoading: computed<boolean>(() => allNotificationsIndexQuery.isLoading.value),
    data: computed<NotificationIndex[]>(() => allNotificationsIndexQuery.data.value.data ?? []),
    nextPage: allNotificationsIndexQuery.getNextPage,
  }))

  async function markAsRead(uuid: NotificationUuid): Promise<void> {
    const result = await markAsReadMutation.execute({
      params: {
        uuid,
      },
    })

    if (result.isErr()) {
      apiErrorToast.show(result.error)
    }
  }

  async function markAllAsRead(): Promise<void> {
    const result = await markAllAsReadMutation.execute()

    if (result.isErr()) {
      apiErrorToast.show(result.error)
    }
  }

  return {
    allNotifications: formattedAllNotifications,
    markAllAsRead,
    markAsRead,
    unreadCount,
    unreadNotifications: formattedUnreadNotifications,
  }
}
