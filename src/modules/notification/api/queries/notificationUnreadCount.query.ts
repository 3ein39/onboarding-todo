import { useQuery } from '@wisemen/vue-core-query'

import { NotificationService } from '@/api/notification/services/notification.service.ts'
import { useAuthStore } from '@/stores/auth.store.ts'
import { assert } from '@/utils/assert.util.ts'
import { useWebSocketSubscription } from '@/websocket/webSocketSubscription.composable.ts'

export function useNotificationUnreadCountQuery() {
  const query = useQuery({
    staleTime: Number.POSITIVE_INFINITY,
    queryFn: async () => {
      return await NotificationService.getUnreadCount()
    },
    queryKey: {
      notificationUnreadCount: {},
    },
  })

  const authStore = useAuthStore()

  const authUser = authStore.authUser

  assert(authUser !== null, 'authUser should not be null')

  useWebSocketSubscription(`user.${authUser.uuid}.notification.*.created`, async () => {
    await query.refetch()
  })

  return query
}
