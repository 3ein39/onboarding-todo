<script setup lang="ts">
import { VcButton } from '@wisemen/vue-core-components'
import {
  AnimatePresence,
  Motion,
} from 'motion-v'
import { computed } from 'vue'

import AppGroup from '@/components/app/group/AppGroup.vue'
import AnimateWidth from '@/components/app/transition/AnimateWidth.vue'
import { useFiltersDateDialog } from '@/components/filters/dialogs/filtersDateDialog.composable'
import type {
  DateFilter,
  FilterWithKey,
} from '@/components/filters/filters.type'
import { useFilterValue } from '@/components/filters/filterValue.composable'
import { useLocalizedDateFormat } from '@/composables/localized-date-format/localizedDateFormat.composable'

const props = defineProps<{
  filter: FilterWithKey<DateFilter<Date>>
}>()

const localizedDateFormat = useLocalizedDateFormat()
const dateFilterDialog = useFiltersDateDialog()

const value = useFilterValue<Date | null>(props.filter.key)

const valueLabel = computed<string>(() => {
  if (value.value === null) {
    return '...'
  }

  return localizedDateFormat.toShortDate(value.value)
})
</script>

<template>
  <VcButton
    :class-config="{
      root: 'rounded-xs justify-start px-md py-xs pr-0',
    }"
    variant="unstyled"
    @click="dateFilterDialog.open(props.filter)"
  >
    <AppGroup gap="sm">
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
              bounce: 0.1,
            }"
            as="span"
            class="inline-block whitespace-nowrap"
          >
            {{ valueLabel }}
          </Motion>
        </AnimatePresence>
      </AnimateWidth>
    </AppGroup>
  </VcButton>
</template>
