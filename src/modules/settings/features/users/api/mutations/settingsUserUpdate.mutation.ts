import { useMutation } from '@wisemen/vue-core-query'

import type { UserUuid } from '@/models/user/userUuid.model'
import { SettingsUserService } from '@/modules/settings/features/users/api/services/settingsUser.service.ts'
import type { SettingsRoleUuid } from '@/modules/settings/models/role/settingsRoleUuid.model.ts'

interface Params {
  userUuid: UserUuid
}

export function useSettingsUserUpdateMutation() {
  return useMutation({
    queryFn: async (queryOptions: {
      body: SettingsRoleUuid[]
      params: Params
    }) => {
      return await SettingsUserService.updateRoles(queryOptions.params.userUuid, queryOptions.body)
    },
    queryKeysToInvalidate: {
      userDetail: {
        userUuid: (params) => params.userUuid,
      },
      userIndex: {},
    },
  })
}
