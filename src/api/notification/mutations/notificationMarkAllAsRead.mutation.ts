import { useMutation } from '@wisemen/vue-core-query'

import { NotificationService } from '@/api/notification/services/notification.service.ts'

export function useNotificationMarkAllAsReadMutation() {
  return useMutation({
    queryFn: async () => {
      return await NotificationService.markAllAsRead()
    },
    queryKeysToInvalidate: {
      notificationIndex: {},
      notificationUnreadCount: {},
    },
  })
}
