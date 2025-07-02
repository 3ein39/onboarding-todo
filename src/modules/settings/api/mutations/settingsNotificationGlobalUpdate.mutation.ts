import type { UseMutationReturnType } from '@wisemen/vue-core-query'
import { useMutation } from '@wisemen/vue-core-query'
import type { Result } from 'neverthrow'

import { SettingsNotificationService } from '@/modules/settings/api/services/settingsNotification.service.ts'
import type { SettingsNotificationGlobalUpdateForm } from '@/modules/settings/models/notification/settingsNotificationGlobalUpdateForm.model.ts'

export function useSettingsNotificationGlobalUpdateMutation():
UseMutationReturnType<SettingsNotificationGlobalUpdateForm, Result<void, Error>> {
  return useMutation<SettingsNotificationGlobalUpdateForm, Result<void, Error>>({
    queryFn: async ({
      body,
    }) => {
      return await SettingsNotificationService.updateGlobal(body)
    },
    queryKeysToInvalidate: {
      settingNotification: {},
    },
  })
}
