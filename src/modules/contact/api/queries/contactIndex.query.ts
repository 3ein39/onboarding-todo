import type { PaginationOptions } from '@wisemen/vue-core-components'
import { useQuery } from '@wisemen/vue-core-query'
import type { ComputedRef } from 'vue'

import type { ContactIndexPagination } from '@/models/contact/index/contactIndexPagination.model'
import { ContactService } from '@/modules/contact/api/services/contact.service'

export function useContactIndexQuery(
  paginationOptions: ComputedRef<PaginationOptions<ContactIndexPagination>>,
) {
  return useQuery({
    queryFn: () => {
      return ContactService.getAll(paginationOptions.value)
    },
    queryKey: {
      contactIndex: {
        paginationOptions,
      },
    },
  })
}
