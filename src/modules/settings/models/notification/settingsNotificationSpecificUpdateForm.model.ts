import type {
  NotificationChannel,
  NotificationType,
} from '@/client'

export interface SettingsNotificationSpecificUpdateForm {
  isEnabled: boolean
  channel: NotificationChannel
  types: NotificationType[]
}
