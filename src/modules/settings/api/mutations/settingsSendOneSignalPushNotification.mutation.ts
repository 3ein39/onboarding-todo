import type { UseMutationReturnType } from '@wisemen/vue-core-query'
import { useMutation } from '@wisemen/vue-core-query'
import type { Result } from 'neverthrow'

import { SettingsOneSignalService } from '@/modules/settings/api/services/settingsOneSignal.service.ts'
import type { SettingsOneSignalPushNotificationForm } from '@/modules/settings/models/one-signal/settingsOneSignalPushNotificationForm.model.ts'

export function useSettingsSendOneSignalPushNotificationMutation():
UseMutationReturnType<SettingsOneSignalPushNotificationForm, Result<unknown, Error>> {
  return useMutation<SettingsOneSignalPushNotificationForm, Result<unknown, Error>>({
    queryFn: async ({
      body,
    }) => {
      return await SettingsOneSignalService.sendPushNotification(body)
    },
    queryKeysToInvalidate: {},
  })
}
