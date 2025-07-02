<script setup lang="ts">
import type {
  AutocompleteFilter,
  FilterValue,
  FilterWithKey,
} from '@/components/filters/filters.type'
import FiltersListbox from '@/components/filters/FiltersListbox.vue'

const props = defineProps<{
  filter: FilterWithKey<AutocompleteFilter<FilterValue>>
}>()
</script>

<template>
  <FiltersListbox
    :filter="props.filter"
    :is-autocomplete="true"
  />
</template>
