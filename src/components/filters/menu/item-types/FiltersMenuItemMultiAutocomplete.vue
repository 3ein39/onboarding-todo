<script setup lang="ts">
import type {
  FilterValue,
  FilterWithKey,
  MultiAutocompleteFilter,
} from '@/components/filters/filters.type'
import FiltersListbox from '@/components/filters/FiltersListbox.vue'

const props = defineProps<{
  filter: FilterWithKey<MultiAutocompleteFilter<FilterValue>>
}>()
</script>

<template>
  <FiltersListbox
    :filter="props.filter"
    :is-autocomplete="true"
  />
</template>
