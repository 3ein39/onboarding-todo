import type { SettingsNotificationPreference } from '@/modules/settings/models/notification/settingsNotification.model.ts'
import type { SettingsNotificationConfig } from '@/modules/settings/models/notification/settingsNotificationConfig.model.ts'
import type { SettingsNotificationConfigDto } from '@/modules/settings/models/notification/settingsNotificationConfigDto.model.ts'
import type { SettingsNotificationDto } from '@/modules/settings/models/notification/settingsNotificationDto.model.ts'
import type { SettingsNotificationGlobalUpdateDto } from '@/modules/settings/models/notification/settingsNotificationGlobalUpdateDto.model.ts'
import type { SettingsNotificationGlobalUpdateForm } from '@/modules/settings/models/notification/settingsNotificationGlobalUpdateForm.model.ts'
import type { SettingsNotificationSpecificUpdateDto } from '@/modules/settings/models/notification/settingsNotificationSpecificUpdateDto.model.ts'
import type { SettingsNotificationSpecificUpdateForm } from '@/modules/settings/models/notification/settingsNotificationSpecificUpdateForm.model.ts'

export class SettingNotificationTransformer {
  static fromDto(dto: SettingsNotificationDto): SettingsNotificationPreference {
    return {
      global: {
        app: dto.appEnabled,
        email: dto.emailEnabled,
        push: dto.pushEnabled,
        sms: dto.smsEnabled,
      },
      preferences: {
        app: dto.preferences.app,
        email: dto.preferences.email,
        push: dto.preferences.push,
        sms: dto.preferences.sms,
      },
      preset: dto.preset,
    }
  }
}

export class SettingNotificationConfigTransformer {
  static fromDto(dto: SettingsNotificationConfigDto): SettingsNotificationConfig {
    return {
      channels: dto.channelConfigs,
      type: dto.type,
    }
  }
}

export class SettingNotificationUpdateTransformer {
  static toDto(form: SettingsNotificationSpecificUpdateForm): SettingsNotificationSpecificUpdateDto {
    return {
      isEnabled: form.isEnabled,
      channel: form.channel,
      types: form.types,
    }
  }
}

export class SettingsNotificationGlobalUpdateTransformer {
  static toDto(form: SettingsNotificationGlobalUpdateForm): SettingsNotificationGlobalUpdateDto {
    return {
      isEnabled: form.isEnabled,
      channel: form.channel,
    }
  }
}
