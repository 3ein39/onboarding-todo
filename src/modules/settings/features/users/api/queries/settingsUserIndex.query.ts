import type { PaginationOptions } from '@wisemen/vue-core-components'
import { useQuery } from '@wisemen/vue-core-query'
import type { ComputedRef } from 'vue'

import type { UserIndexPagination } from '@/models/user/index/userIndexPagination.model.ts'
import { SettingsUserService } from '@/modules/settings/features/users/api/services/settingsUser.service.ts'

export function useSettingsUserIndexQuery(
  paginationOptions: ComputedRef<PaginationOptions<UserIndexPagination>>,
) {
  return useQuery({
    queryFn: () => {
      return SettingsUserService.getAll(paginationOptions.value)
    },
    queryKey: {
      userIndex: {
        paginationOptions,
      },
    },
  })
}
