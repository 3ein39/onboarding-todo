import { useMutation } from '@wisemen/vue-core-query'

import { NotificationService } from '@/api/notification/services/notification.service.ts'
import type { NotificationUuid } from '@/models/notification/notificationUuid.model.ts'

interface Params {
  uuid: NotificationUuid
}

export function useNotificationMarkAsReadMutation() {
  return useMutation({
    queryFn: async (queryOptions: {
      params: Params
    }) => {
      await NotificationService.markAsRead(queryOptions.params.uuid)
    },
    queryKeysToInvalidate: {
      notificationIndex: {},
      notificationUnreadCount: {},
    },
  })
}
