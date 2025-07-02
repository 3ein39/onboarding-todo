import type { UseMutationReturnType } from '@wisemen/vue-core-query'
import { useMutation } from '@wisemen/vue-core-query'
import type { Result } from 'neverthrow'

import { SettingsRoleService } from '@/modules/settings/api/services/settingsRole.service.ts'
import type { SettingsRoleUuid } from '@/modules/settings/models/role/settingsRoleUuid.model.ts'

export function useSettingsRoleDeleteMutation(): UseMutationReturnType<SettingsRoleUuid, Result<void, Error>> {
  return useMutation<SettingsRoleUuid, Result<void, Error>>({
    queryFn: async ({
      body,
    }) => {
      return await SettingsRoleService.delete(body)
    },
    queryKeysToInvalidate: {
      permissions: {},
      roles: {},
    },
  })
}
