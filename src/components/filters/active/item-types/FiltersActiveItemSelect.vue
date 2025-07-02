<script setup lang="ts">
import {
  AnimatePresence,
  Motion,
} from 'motion-v'
import { computed } from 'vue'

import AnimateWidth from '@/components/app/transition/AnimateWidth.vue'
import FiltersActiveItemPopover from '@/components/filters/active/FiltersActiveItemPopover.vue'
import type {
  FilterValue,
  FilterWithKey,
  SelectFilter,
} from '@/components/filters/filters.type'
import { useFilterValue } from '@/components/filters/filterValue.composable'
import FiltersMenuItemSelect from '@/components/filters/menu/item-types/FiltersMenuItemSelect.vue'

const props = defineProps<{
  filter: FilterWithKey<SelectFilter<FilterValue>>
}>()

const value = useFilterValue<FilterValue>(props.filter.key)

const valueLabel = computed<string>(() => {
  if (value.value === null) {
    return '...'
  }

  return props.filter.displayFn(value.value)
})
</script>

<template>
  <FiltersActiveItemPopover :filter="props.filter">
    <template #label>
      {{ filter.label }}:

      <AnimateWidth :duration-in-ms="300">
        <AnimatePresence
          :initial="false"
          mode="popLayout"
        >
          <Motion
            :key="valueLabel"
            :initial="{ opacity: 0 }"
            :animate="{ opacity: 1 }"
            :exit="{ opacity: 0 }"
            :transition="{
              duration: 0.3,
              type: 'spring',
              bounce: 0,
            }"
            as="span"
            class="inline-block"
          >
            {{ valueLabel }}
          </Motion>
        </AnimatePresence>
      </AnimateWidth>
    </template>

    <template #content>
      <FiltersMenuItemSelect :filter="props.filter" />
    </template>
  </FiltersActiveItemPopover>
</template>
