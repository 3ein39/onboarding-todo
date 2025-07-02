import type { Result } from 'neverthrow'
import { ResultAsync } from 'neverthrow'

import type { NotificationPreset } from '@/client'
import {
  getMyNotificationPreferencesV1,
  getNotificationTypesConfigV1,
  sendTestNotificationV1,
  updateMyChannelNotificationPreferenceV1,
  updateMyNotificationPreferencePresetV1,
  updateMyNotificationTypePreferenceV1,
} from '@/client'
import type { SettingsNotificationPreference } from '@/modules/settings/models/notification/settingsNotification.model.ts'
import {
  SettingNotificationConfigTransformer,
  SettingNotificationTransformer,
  SettingNotificationUpdateTransformer,
  SettingsNotificationGlobalUpdateTransformer,
} from '@/modules/settings/models/notification/settingsNotification.transformer.ts'
import type { SettingsNotificationConfig } from '@/modules/settings/models/notification/settingsNotificationConfig.model.ts'
import type { SettingsNotificationGlobalUpdateForm } from '@/modules/settings/models/notification/settingsNotificationGlobalUpdateForm.model.ts'
import type { SettingsNotificationSpecificUpdateForm } from '@/modules/settings/models/notification/settingsNotificationSpecificUpdateForm.model.ts'

export class SettingsNotificationService {
  static async getAll(): Promise<SettingsNotificationPreference> {
    const response = await getMyNotificationPreferencesV1()

    return SettingNotificationTransformer.fromDto(response.data)
  }

  static async getConfig(): Promise<SettingsNotificationConfig[]> {
    const response = await getNotificationTypesConfigV1()

    return response.data.items.map(SettingNotificationConfigTransformer.fromDto)
  }

  static async sendTest(message: string): Promise<Result<void, Error>> {
    return await ResultAsync.fromPromise(
      sendTestNotificationV1({
        body: {
          message,
        },
      }),
      () => new Error('Failed to send test notification'),
    ).map((res) => res.data)
  }

  static async updateGlobal(form: SettingsNotificationGlobalUpdateForm): Promise<Result<void, Error>> {
    return await ResultAsync.fromPromise(
      updateMyChannelNotificationPreferenceV1({
        body: SettingsNotificationGlobalUpdateTransformer.toDto(form),
      }),
      () => new Error('Failed to update global notification preference'),
    ).map((res) => res.data)
  }

  static async updatePreset(preset: NotificationPreset): Promise<Result<void, Error>> {
    return await ResultAsync.fromPromise(
      updateMyNotificationPreferencePresetV1({
        body: {
          preset,
        },
      }),
      () => new Error('Failed to update notification preset'),
    ).map((res) => res.data)
  }

  static async updateSpecific(form: SettingsNotificationSpecificUpdateForm): Promise<Result<void, Error>> {
    return await ResultAsync.fromPromise(
      updateMyNotificationTypePreferenceV1({
        body: SettingNotificationUpdateTransformer.toDto(form),
      }),
      () => new Error('Failed to update notification preference'),
    ).map((res) => res.data)
  }
}
