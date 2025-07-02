import type { UseMutationReturnType } from '@wisemen/vue-core-query'
import { useMutation } from '@wisemen/vue-core-query'
import type { Result } from 'neverthrow'

import { SettingsNotificationService } from '@/modules/settings/api/services/settingsNotification.service.ts'

export function useSettingsSendTestNotification(): UseMutationReturnType<string, Result<void, Error>> {
  return useMutation<string, Result<void, Error>>({
    queryFn: async ({
      body,
    }) => {
      return await SettingsNotificationService.sendTest(body)
    },
    queryKeysToInvalidate: {},
  })
}
