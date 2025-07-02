<script setup lang="ts">
import type {
  FilterValue,
  FilterWithKey,
  MultiSelectFilter,
} from '@/components/filters/filters.type'
import FiltersListbox from '@/components/filters/FiltersListbox.vue'

const props = defineProps<{
  filter: FilterWithKey<MultiSelectFilter<FilterValue>>
}>()
</script>

<template>
  <FiltersListbox
    :filter="props.filter"
    :is-autocomplete="false"
  />
</template>
