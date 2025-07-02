import { useVcDialog } from '@wisemen/vue-core-components'
import {
  computed,
  watch,
} from 'vue'

import { useInjectFiltersContext } from '@/components/filters/filters.context'
import type {
  DateFilter,
  FilterWithKey,
} from '@/components/filters/filters.type'

interface UseFilterDateDialog {
  open: (filter: FilterWithKey<DateFilter<Date>>) => void
}

export function useFiltersDateDialog(): UseFilterDateDialog {
  const dialog = useVcDialog({
    component: () => import('@/components/filters/dialogs/FiltersDateDialog.vue'),
  })

  const {
    clearFilter,
    openFilterKey,
    values,
  } = useInjectFiltersContext()

  function open(filter: FilterWithKey<DateFilter<Date>>): void {
    const value = computed<Date | null>(() => values.value[filter.key] as Date | null)

    openFilterKey.value = filter.key

    dialog.open({
      filter,
      'modelValue': value,
      'onUpdate:modelValue': (updatedValue) => {
        values.value[filter.key] = updatedValue
      },
    })

    watch(() => dialog.isOpen(), (isOpen) => {
      if (isOpen) {
        openFilterKey.value = filter.key
      }
      else {
        openFilterKey.value = null
        clearFilter(filter.key, true)
      }
    })
  }

  return {
    open,
  }
}
