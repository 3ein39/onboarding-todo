import { useDebounce } from '@vueuse/core'
import {
  computed,
  ref,
  watch,
} from 'vue'

interface UseDebounceSearchOptions {
  debounceTimeInMs?: number
  defaultValue?: string
  onDebounceSearch: (value: string) => void
}

export function useDebounceSearch(options: UseDebounceSearchOptions) {
  const search = ref<string>(options.defaultValue ?? '')
  const debouncedSearch = useDebounce(search, options.debounceTimeInMs ?? 300)

  const isDebouncing = computed<boolean>(() => debouncedSearch.value !== search.value)

  watch(debouncedSearch, (value) => {
    options.onDebounceSearch(value)
  })

  return {
    isDebouncing,
    debouncedSearch,
    search,
  }
}
