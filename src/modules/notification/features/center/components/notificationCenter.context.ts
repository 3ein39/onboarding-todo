import type {
  ComputedRef,
  Ref,
} from 'vue'

import { useContext } from '@/composables/context/context.composable'
import type { NotificationIndex } from '@/models/notification/notificationIndex.model'
import type { NotificationUuid } from '@/models/notification/notificationUuid.model'
import type {
  FormattedQueryResponse,
  NotificationCenterTab,
} from '@/modules/notification/features/center/types/notificationCenter.type'

interface NotificationCenterContext {
  activeTab: Ref<NotificationCenterTab>
  allNotifications: ComputedRef<FormattedQueryResponse<NotificationIndex[]>>
  markAllAsRead: () => Promise<void>
  markAsRead: (uuid: NotificationUuid) => Promise<void>
  unreadCount: ComputedRef<number>
  unreadNotifications: ComputedRef<FormattedQueryResponse<NotificationIndex[]>>
}

export const [
  useProvideNotificationCenterContext,
  useInjectNotificationCenterContext,
] = useContext<NotificationCenterContext>('notificationCenterContext')
