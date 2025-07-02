import type { UseMutationReturnType } from '@wisemen/vue-core-query'
import { useMutation } from '@wisemen/vue-core-query'
import type { Result } from 'neverthrow'

import type { NotificationPreset } from '@/client'
import { SettingsNotificationService } from '@/modules/settings/api/services/settingsNotification.service.ts'

export function useSettingsNotificationPresetUpdateMutation():
UseMutationReturnType<NotificationPreset, Result<void, Error>> {
  return useMutation<NotificationPreset, Result<void, Error>>({
    queryFn: async ({
      body,
    }) => {
      return await SettingsNotificationService.updatePreset(body)
    },
    queryKeysToInvalidate: {
      settingNotification: {},
    },
  })
}
