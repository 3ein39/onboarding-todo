import type { UseMutationReturnType } from '@wisemen/vue-core-query'
import { useMutation } from '@wisemen/vue-core-query'
import type { Result } from 'neverthrow'

import { SettingsRoleService } from '@/modules/settings/api/services/settingsRole.service.ts'
import type { SettingsRolePermissionUpdateForm } from '@/modules/settings/models/role/settingsRolePermissionUpdateForm.model.ts'

export function useSettingsRoleBulkUpdateMutation():
UseMutationReturnType<SettingsRolePermissionUpdateForm, Result<void, Error>> {
  return useMutation<SettingsRolePermissionUpdateForm, Result<void, Error>>({
    queryFn: async ({
      body,
    }) => {
      return await SettingsRoleService.updateRolesInBulk(body)
    },
    queryKeysToInvalidate: {
      permissions: {},
      roles: {},
    },
  })
}
