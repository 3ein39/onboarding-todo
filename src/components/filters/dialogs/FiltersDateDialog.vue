<script setup lang="ts">
import {
  VcDatePicker,
  VcDialog,
  VcDialogDescription,
  VcDialogTitle,
} from '@wisemen/vue-core-components'

import type {
  DateFilter,
  FilterWithKey,
} from '@/components/filters/filters.type'

const props = defineProps<{
  filter: FilterWithKey<DateFilter<Date>>
}>()

const value = defineModel<Date | null>({
  required: true,
})
</script>

<template>
  <VcDialog
    :class-config="{
      overlay: 'backdrop-blur-none',
    }"
    class="p-xl"
  >
    <VcDialogTitle class="sr-only">
      <h1>
        {{ props.filter.label }}
      </h1>
    </VcDialogTitle>

    <VcDialogDescription class="sr-only">
      <p>
        test
      </p>
    </VcDialogDescription>

    <VcDatePicker
      v-model="value"
      :label="props.filter.label"
      :allow-deselect="true"
    />
  </VcDialog>
</template>
