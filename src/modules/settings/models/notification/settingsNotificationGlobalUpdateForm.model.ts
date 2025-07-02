import type { NotificationChannel } from '@/client'

export interface SettingsNotificationGlobalUpdateForm {
  isEnabled: boolean
  channel: NotificationChannel
}
