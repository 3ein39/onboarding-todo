import type { ComputedRef } from 'vue'

import type { Filters } from '@/components/filters/filters.composable'
import { useContext } from '@/composables/context/context.composable'

interface FiltersContext extends Filters<any> {
  hasInteractedViaKeyboard: ComputedRef<boolean>
}

export const [
  useProvideFiltersContext,
  useInjectFiltersContext,
] = useContext<FiltersContext>('filtersContext')
