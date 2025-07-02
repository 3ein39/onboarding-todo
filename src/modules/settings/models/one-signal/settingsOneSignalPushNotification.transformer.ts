import type { SettingsOneSignalPushNotificationCreateDto } from '@/modules/settings/models/one-signal/settingsOneSignalPushNotificationCreateDto.model.ts'
import type { SettingsOneSignalPushNotificationForm } from '@/modules/settings/models/one-signal/settingsOneSignalPushNotificationForm.model.ts'

export class SettingsOneSignalPushNotificationCreateTransformer {
  static toDto(form: SettingsOneSignalPushNotificationForm): SettingsOneSignalPushNotificationCreateDto {
    return {
      title: {
        en: form.title,
        nl: form.title,
      },
      name: form.name,
      description: {
        en: form.description,
        nl: form.description,
      },
      userUuids: form.users.map((user) => user.uuid),
    }
  }
}
