import type { WritableComputedRef } from 'vue'
import { computed } from 'vue'

import { useInjectFiltersContext } from '@/components/filters/filters.context'

export function useFilterValue<TValue>(key: string): WritableComputedRef<TValue> {
  const {
    values,
  } = useInjectFiltersContext()

  const value = computed<TValue>({
    get: () => values.value[key],
    set: (value) => {
      values.value[key] = value ?? null
    },
  })

  return value
}
