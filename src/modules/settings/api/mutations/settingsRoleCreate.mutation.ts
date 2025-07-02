import type { UseMutationReturnType } from '@wisemen/vue-core-query'
import { useMutation } from '@wisemen/vue-core-query'
import type { Result } from 'neverthrow'

import { SettingsRoleService } from '@/modules/settings/api/services/settingsRole.service.ts'

export function useSettingsRoleCreateMutation(): UseMutationReturnType<string, Result<void, Error>> {
  return useMutation<string, Result<void, Error>>({
    queryFn: async ({
      body,
    }) => {
      return await SettingsRoleService.create(body)
    },
    queryKeysToInvalidate: {
      permissions: {},
      roles: {},
    },
  })
}
