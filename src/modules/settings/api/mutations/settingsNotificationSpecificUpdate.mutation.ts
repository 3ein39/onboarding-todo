import type { UseMutationReturnType } from '@wisemen/vue-core-query'
import { useMutation } from '@wisemen/vue-core-query'
import type { Result } from 'neverthrow'

import { SettingsNotificationService } from '@/modules/settings/api/services/settingsNotification.service.ts'
import type { SettingsNotificationSpecificUpdateForm } from '@/modules/settings/models/notification/settingsNotificationSpecificUpdateForm.model.ts'

export function useSettingsNotificationSpecificUpdateMutation():
UseMutationReturnType<SettingsNotificationSpecificUpdateForm, Result<void, Error>> {
  return useMutation<SettingsNotificationSpecificUpdateForm, Result<void, Error>>({
    queryFn: async ({
      body,
    }) => {
      return await SettingsNotificationService.updateSpecific(body)
    },
    queryKeysToInvalidate: {
      settingNotification: {},
    },
  })
}
