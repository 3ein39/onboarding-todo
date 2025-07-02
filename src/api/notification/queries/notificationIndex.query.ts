import type { PaginationOptions } from '@wisemen/vue-core-components'
import { useInfiniteQuery } from '@wisemen/vue-core-query'
import type { ComputedRef } from 'vue'

import { NotificationService } from '@/api/notification/services/notification.service.ts'
import type { NotificationIndexPagination } from '@/models/notification/notificationIndexPagination.model.ts'
import { useAuthStore } from '@/stores/auth.store.ts'
import { assert } from '@/utils/assert.util.ts'
import { useWebSocketSubscription } from '@/websocket/webSocketSubscription.composable.ts'

export function useNotificationIndexQuery(
  paginationOptions: ComputedRef<PaginationOptions<NotificationIndexPagination>>,
) {
  const authStore = useAuthStore()

  const infiniteQuery = useInfiniteQuery({
    paginationOptions,
    queryFn: async (options: PaginationOptions<NotificationIndexPagination>) => {
      return await NotificationService.getAll(options)
    },
    queryKey: {
      notificationIndex: {
        paginationOptions,
      },
    },
  })

  const authUser = authStore.authUser

  assert(authUser !== null, 'authUser should not be null')

  useWebSocketSubscription(`user.${authUser.uuid}.notification.*.created`, async () => {
    await infiniteQuery.refetch()
  })

  return infiniteQuery
}
