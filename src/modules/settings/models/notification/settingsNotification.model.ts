import type {
  NotificationPreset,
  NotificationType,
} from '@/client'

export interface SettingsNotificationPreference {
  global: {
    app: boolean
    email: boolean
    push: boolean
    sms: boolean
  }
  preferences: SettingsNotificationPreferences
  preset: NotificationPreset | null
}

export interface SettingsNotificationPreferences {
  app: NotificationType[]
  email: NotificationType[]
  push: NotificationType[]
  sms: NotificationType[]
};

export interface SettingsNotification {
  actions: NotificationType[]
  key: string
}
