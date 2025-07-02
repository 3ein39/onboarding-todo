import type { UseQueryOptions } from '@wisemen/vue-core-query'
import { useQuery } from '@wisemen/vue-core-query'
import type { ComputedRef } from 'vue'
import { toValue } from 'vue'

import { usePrefetchQuery } from '@/composables/prefetch-query/prefetchQuery.composable'
import type { ContactUuid } from '@/models/contact/contactUuid.model'
import type { ContactDetail } from '@/models/contact/detail/contactDetail.model'
import { ContactService } from '@/modules/contact/api/services/contact.service'
import { TimeUtil } from '@/utils/time.util'

export function contactDetailQuery(contactUuid: ComputedRef<ContactUuid>): UseQueryOptions<ContactDetail> {
  return {
    staleTime: TimeUtil.seconds(30),
    queryFn: () => ContactService.getByUuid(toValue(contactUuid)),
    queryKey: {
      contactDetail: {
        contactUuid,
      },
    },
  }
}

export function useContactDetailQuery(contactUuid: ComputedRef<ContactUuid>) {
  return useQuery(contactDetailQuery(contactUuid))
}

export function useContactDetailPrefetchQuery(contactUuid: ComputedRef<ContactUuid>) {
  return usePrefetchQuery(contactDetailQuery(contactUuid))
}
