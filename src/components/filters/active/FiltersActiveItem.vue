<script setup lang="ts">
import { VcBadge } from '@wisemen/vue-core-components'

import FiltersActiveItemAutocomplete from '@/components/filters/active/item-types/FiltersActiveItemAutocomplete.vue'
import FiltersActiveItemDate from '@/components/filters/active/item-types/FiltersActiveItemDate.vue'
import FiltersActiveItemMultiAutocomplete from '@/components/filters/active/item-types/FiltersActiveItemMultiAutocomplete.vue'
import FiltersActiveItemMultiSelect from '@/components/filters/active/item-types/FiltersActiveItemMultiSelect.vue'
import FiltersActiveItemSelect from '@/components/filters/active/item-types/FiltersActiveItemSelect.vue'
import { useInjectFiltersContext } from '@/components/filters/filters.context'
import type {
  FilterUnion,
  FilterWithKey,
} from '@/components/filters/filters.type'

const props = defineProps<{
  filter: FilterWithKey<FilterUnion>
}>()

const {
  clearFilter,
} = useInjectFiltersContext()
</script>

<template>
  <VcBadge
    :class-config="{
      root: `rounded-md !p-0 ${props.filter.isStatic ? '!pr-md' : '!pr-sm'} !gap-xs`,
      removeButton: {
        root: 'size-5',
      },
    }"
    :is-removable="!props.filter.isStatic"
    color="gray"
    size="lg"
    variant="translucent"
    @remove="clearFilter(props.filter.key)"
  >
    <FiltersActiveItemSelect
      v-if="props.filter.type === 'select'"
      :filter="props.filter"
    />

    <FiltersActiveItemAutocomplete
      v-else-if="props.filter.type === 'autocomplete'"
      :filter="props.filter"
    />

    <FiltersActiveItemMultiSelect
      v-else-if="props.filter.type === 'multi-select'"
      :filter="props.filter"
    />

    <FiltersActiveItemMultiAutocomplete
      v-else-if="props.filter.type === 'multi-autocomplete'"
      :filter="props.filter"
    />

    <FiltersActiveItemDate
      v-else-if="props.filter.type === 'date'"
      :filter="props.filter"
    />
  </VcBadge>
</template>
