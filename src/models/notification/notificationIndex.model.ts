import type { Icon } from '@wisemen/vue-core-components'

import type { NotificationType } from '@/client'
import type { CalendarDateTime } from '@/models/date/calendarDateTime.model.ts'
import type { NotificationUuid } from '@/models/notification/notificationUuid.model.ts'

interface Notification {
  notificationUuid: NotificationUuid
  createdAt: CalendarDateTime
  readAt: CalendarDateTime | null
  createdByName: string | null
  icon: Icon
  message: string
  type: NotificationType
  meta: unknown
}

export interface NotificationDriverCreated extends Notification {
  type: NotificationType.USER_CREATED
  meta: unknown
}

export interface NotificationTest extends Notification {
  type: NotificationType.TEST_NOTIFICATION
  meta: {
    message: string
  }
}

export type NotificationIndex = NotificationDriverCreated | NotificationTest
