import type { UseQueryReturnType } from '@wisemen/vue-core-query'
import { useQuery } from '@wisemen/vue-core-query'

import { SettingsNotificationService } from '@/modules/settings/api/services/settingsNotification.service.ts'
import type { SettingsNotificationConfig } from '@/modules/settings/models/notification/settingsNotificationConfig.model.ts'

export function useSettingsNotificationDefaultsQuery(): UseQueryReturnType<SettingsNotificationConfig[]> {
  return useQuery<SettingsNotificationConfig[]>({
    queryFn: () => {
      return SettingsNotificationService.getConfig()
    },
    queryKey: {
      settingNotificationDefaults: {},
    },
  })
}
