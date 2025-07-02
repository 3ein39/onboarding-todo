import { useQuery } from '@wisemen/vue-core-query'
import type { ComputedRef } from 'vue'

import { GlobalSearchService } from '@/api/global-search/services/globalSearch.service.ts'

export function useGlobalSearchIndexQuery(
  search: ComputedRef<string>,
) {
  return useQuery({
    queryFn: async () => {
      if (search.value.length === 0) {
        return []
      }

      return await GlobalSearchService.find(search.value)
    },
    queryKey: {
      globalSearchIndex: {
        search,
      },
    },
  })
}
