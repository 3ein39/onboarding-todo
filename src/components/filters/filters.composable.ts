import type {
  ComputedRef,
  Ref,
} from 'vue'
import {
  computed,
  reactive,
  ref,
  watch,
} from 'vue'

import type {
  FilterDefinition,
  FilterDefinitionWithKey,
  FilterValue,
} from '@/components/filters/filters.type'
import { assert } from '@/utils/assert.util'

type FilterValues<TFilterConfig extends { [key in keyof TFilterConfig]: FilterValue }> = {
  [key in keyof TFilterConfig]: FilterDefinition<TFilterConfig[key]>['defaultValue'] | TFilterConfig[key]
}

type FilterKeyUnion<TFilterConfig> = keyof TFilterConfig

export interface Filters<TFilterConfig extends { [key in keyof TFilterConfig]: FilterValue }> {
  /**
   * List of currently active filters (i.e., those whose value differs from their default or are open).
   */
  activeFilters: ComputedRef<FilterDefinition<TFilterConfig>[]>

  /**
   * Clears the value of a filter and removes it from the active list.
   * @param key The filter key to clear.
   * @param onlyIfEmpty If true, the filter is only cleared if it is currently empty.
   */
  clearFilter: (key: FilterKeyUnion<TFilterConfig>, onlyIfEmpty?: boolean) => void

  /**
   * All available filter definitions with their keys.
   */
  filters: ComputedRef<FilterDefinitionWithKey<TFilterConfig>[]>

  /**
   * The key of the currently opened filter (e.g., for showing dropdowns or UI focus).
   */
  openFilterKey: Ref<FilterKeyUnion<TFilterConfig> | null>

  /**
   * The current filter values.
   */
  values: Ref<FilterValues<TFilterConfig>>
}

export function useFilters<const TFilterConfig extends { [key in keyof TFilterConfig]: FilterValue }>(
  filterConfig: () => { [key in keyof TFilterConfig]: FilterDefinition<TFilterConfig[key]> },
): Filters<TFilterConfig> {
  // Tracks the keys of currently active filters. Used to determine the order of the active filters.
  const activeFiltersKeySet = reactive<Set<FilterKeyUnion<TFilterConfig>>>(
    new Set(),
  ) as Set<FilterKeyUnion<TFilterConfig>>

  // Holds the current values for each filter
  const values = ref<FilterValues<TFilterConfig>>(filterConfigToDefaultValues())

  // Tracks which filter key is currently open
  const openFilterKey = ref<FilterKeyUnion<TFilterConfig> | null>(null)

  /**
   * All filters with their keys included in the definition
   */
  const filters = computed<FilterDefinitionWithKey<TFilterConfig>[]>(() =>
    Object.entries(filterConfig()).map(([
      key,
      filter,
    ]) => ({
      ...filter as FilterDefinition<TFilterConfig>,
      key,
    })) as FilterDefinitionWithKey<TFilterConfig>[])

  /**
   * Filters that are currently active (either have non-default values or are open)
   */
  const activeFilters = computed<FilterDefinitionWithKey<TFilterConfig>[]>(() =>
    Array.from(activeFiltersKeySet).map((key) => {
      const filter = filters.value.find((f) => f.key === key) ?? null

      assert(filter !== null, `Filter with key "${key.toString()}" not found`)

      return filter
    }))

  /**
   * Initializes the filter values using their default values.
   */
  function filterConfigToDefaultValues(): FilterValues<TFilterConfig> {
    return Object.fromEntries(
      Object.entries(filterConfig()).map(([
        key,
        filter,
      ]) => [
        key,
        (filter as FilterDefinition<typeof key>).defaultValue,
      ]),
    ) as FilterValues<TFilterConfig>
  }

  /**
   * Retrieves the filter definition for a given key.
   * @param key The filter key.
   */
  function getFilterByKey(
    key: FilterKeyUnion<TFilterConfig>,
  ): FilterDefinitionWithKey<TFilterConfig> {
    const filter = filters.value.find((f) => f.key === key)

    if (!filter) {
      throw new Error(`Filter with key "${key.toString()}" not found`)
    }

    return filter
  }

  /**
   * Determines whether a filter is considered "active."
   * A filter is active if its current value differs from its default or if it is currently open.
   * @param key The key of the filter to check.
   */
  function isFilterActive(key: FilterKeyUnion<TFilterConfig>): boolean {
    return JSON.stringify(values.value[key]) !== JSON.stringify(filterConfig()[key].defaultValue)
      || openFilterKey.value === key
  }

  /**
   * Provides an empty fallback value depending on the filter type.
   * @param key The filter key.
   */
  function getFilterFallbackValue(key: FilterKeyUnion<TFilterConfig>): unknown {
    const filter = getFilterByKey(key)

    switch (filter.type) {
      case 'select':
      case 'autocomplete':
      case 'date':
        return null
      case 'multi-select':
      case 'multi-autocomplete':
        return []
    }
  }

  /**
   * Clears the value of the specified filter.
   * Optionally, it only clears the filter if the value is already empty.
   * @param key The key of the filter to clear.
   * @param onlyIfEmpty If true, the filter is only cleared if it is currently empty.
   */
  function clearFilter(key: FilterKeyUnion<TFilterConfig>, onlyIfEmpty = false): void {
    const value = values.value[key]
    const isEmpty = JSON.stringify(value) === JSON.stringify(getFilterFallbackValue(key))

    if (onlyIfEmpty && !isEmpty) {
      return
    }

    values.value[key] = getFilterFallbackValue(key)
    activeFiltersKeySet.delete(key)
  }

  /**
   * Watches filter values and updates the set of active filter keys accordingly.
   */
  watch(values, () => {
    for (const filter of filters.value) {
      const typedKey = filter.key as FilterKeyUnion<TFilterConfig>

      if (isFilterActive(typedKey)) {
        activeFiltersKeySet.add(typedKey)
      }
      else {
        activeFiltersKeySet.delete(typedKey)
      }
    }
  }, {
    deep: true,
    immediate: true,
  })

  return {
    activeFilters,
    clearFilter,
    filters,
    openFilterKey: openFilterKey as Ref<FilterKeyUnion<TFilterConfig> | null>,
    values: values as Ref<FilterValues<TFilterConfig>>,
  }
}
