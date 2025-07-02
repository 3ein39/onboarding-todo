import type { UseQueryReturnType } from '@wisemen/vue-core-query'
import { useQuery } from '@wisemen/vue-core-query'

import { SettingsNotificationService } from '@/modules/settings/api/services/settingsNotification.service.ts'
import type { SettingsNotificationPreference } from '@/modules/settings/models/notification/settingsNotification.model.ts'

export function useSettingNotificationQuery(): UseQueryReturnType<SettingsNotificationPreference> {
  return useQuery<SettingsNotificationPreference>({
    queryFn: () => {
      return SettingsNotificationService.getAll()
    },
    queryKey: {
      settingNotification: {},
    },
  })
}
