import type { NotificationChannel } from '@/client'

export interface SettingsNotificationGlobalUpdateDto {
  isEnabled: boolean
  channel: NotificationChannel
}
