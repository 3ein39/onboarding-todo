import type { ComputedRef } from 'vue'

import { useContext } from '@/composables/context/context.composable'
import type { NotificationIndex } from '@/models/notification/notificationIndex.model'

interface NotificationCenterItemContext {
  markAsRead: () => Promise<void>
  notification: ComputedRef<NotificationIndex>
}

export const [
  useProvideNotificationCenterItemContext,
  useInjectNotificationCenterItemContext,
] = useContext<NotificationCenterItemContext>('notificationCenterItemContext')
