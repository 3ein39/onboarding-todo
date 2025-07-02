<script setup lang="ts">
import NumberFlow from '@number-flow/vue'
import { VcBadge } from '@wisemen/vue-core-components'

import AnimateWidth from '@/components/app/transition/AnimateWidth.vue'
import FiltersActiveItemPopover from '@/components/filters/active/FiltersActiveItemPopover.vue'
import type {
  FilterValue,
  FilterWithKey,
  MultiSelectFilter,
} from '@/components/filters/filters.type'
import { useFilterValue } from '@/components/filters/filterValue.composable'
import FiltersMenuItemMultiSelect from '@/components/filters/menu/item-types/FiltersMenuItemMultiSelect.vue'

const props = defineProps<{
  filter: FilterWithKey<MultiSelectFilter<FilterValue>>
}>()

const value = useFilterValue<FilterValue[]>(props.filter.key)
</script>

<template>
  <FiltersActiveItemPopover :filter="props.filter">
    <template #label>
      {{ filter.label }}

      <VcBadge
        :class-config="{
          root: 'rounded-sm !px-sm !py-0 !bg-gray-200 !border-gray-200 !text-primary dark:!bg-gray-700 dark:!border-gray-700 dark:!text-primary-on-brand',
        }"
        color="gray"
        variant="solid"
        size="sm"
      >
        <AnimateWidth :duration-in-ms="300">
          <NumberFlow
            :value="value.length"
            :spin-timing="{
              duration: 200,
              easing: 'ease-in-out',
            }"
          />
        </AnimateWidth>
      </VcBadge>
    </template>

    <template #content>
      <FiltersMenuItemMultiSelect :filter="props.filter" />
    </template>
  </FiltersActiveItemPopover>
</template>
