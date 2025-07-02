import { useQueryClient } from '@tanstack/vue-query'
import type { UseQueryOptions } from '@wisemen/vue-core-query'

import { TimeUtil } from '@/utils/time.util'

export function usePrefetchQuery<TResData>(query: UseQueryOptions<TResData>) {
  const queryClient = useQueryClient()

  function getQueryKey(): unknown[] {
    const [
      queryKey,
      params,
    ] = Object.entries(query.queryKey)[0]

    return [
      queryKey,
      params,
    ]
  }

  async function execute(): Promise<void> {
    await queryClient.prefetchQuery({
      staleTime: query.staleTime ?? TimeUtil.minutes(1),
      queryFn: query.queryFn,
      queryKey: getQueryKey(),
    })
  }

  return {
    execute,
  }
}
