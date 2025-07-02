import type {
  NotificationChannel,
  NotificationType,
} from '@/client'

export interface SettingsNotificationConfig {
  channels: {
    isSupported: boolean
    channel: NotificationChannel
    defaultValue: boolean
  }[]
  type: NotificationType
}
