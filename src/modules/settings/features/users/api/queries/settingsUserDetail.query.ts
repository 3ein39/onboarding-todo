import type { UseQueryOptions } from '@wisemen/vue-core-query'
import { useQuery } from '@wisemen/vue-core-query'
import type { ComputedRef } from 'vue'
import { toValue } from 'vue'

import { usePrefetchQuery } from '@/composables/prefetch-query/prefetchQuery.composable'
import type { UserDetail } from '@/models/user/detail/userDetail.model'
import type { UserUuid } from '@/models/user/userUuid.model'
import { SettingsUserService } from '@/modules/settings/features/users/api/services/settingsUser.service.ts'
import { TimeUtil } from '@/utils/time.util'

export function settingsUserDetailQuery(userUuid: ComputedRef<UserUuid>): UseQueryOptions<UserDetail> {
  return {
    staleTime: TimeUtil.seconds(30),
    queryFn: () => SettingsUserService.getByUuid(toValue(userUuid)),
    queryKey: {
      userDetail: {
        userUuid,
      },
    },
  }
}

export function useSettingsUserDetailQuery(userUuid: ComputedRef<UserUuid>) {
  return useQuery(settingsUserDetailQuery(userUuid))
}

export function useSettingsUserDetailPrefetchQuery(userUuid: ComputedRef<UserUuid>) {
  return usePrefetchQuery(settingsUserDetailQuery(userUuid))
}
