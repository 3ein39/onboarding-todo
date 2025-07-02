import type { NotificationChannel } from '@/client'
import type { I18nKey } from '@/plugins/i18n.plugin.ts'
import { createI18nKeyMap } from '@/types/enum.type.ts'

export class SettingNotificationChannelEnumUtil {
  private static i18nKeys = createI18nKeyMap<NotificationChannel>({
    app: 'module.settings.notifications.channel.app',
    email: 'module.settings.notifications.channel.email',
    push: 'module.settings.notifications.channel.push',
    sms: 'module.settings.notifications.channel.sms',
  })

  static getI18nKey(value: NotificationChannel): I18nKey {
    return this.i18nKeys.get(value)!
  }
}
