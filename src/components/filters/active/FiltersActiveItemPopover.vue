<script setup lang="ts">
import {
  VcButton,
  VcPopover,
} from '@wisemen/vue-core-components'

import AppGroup from '@/components/app/group/AppGroup.vue'
import { useInjectFiltersContext } from '@/components/filters/filters.context'
import type {
  FilterUnion,
  FilterWithKey,
} from '@/components/filters/filters.type'

const props = defineProps<{
  filter: FilterWithKey<FilterUnion>
}>()

const {
  clearFilter, openFilterKey,
} = useInjectFiltersContext()

function onUpdateIsOpen(isOpen: boolean): void {
  if (isOpen) {
    openFilterKey.value = props.filter.key
  }
  else {
    openFilterKey.value = null
    clearFilter(props.filter.key, true)
  }
}
</script>

<template>
  <VcPopover
    :is-popover-arrow-hidden="true"
    :popover-side-offset="5"
    popover-align="start"
    @update:is-open="onUpdateIsOpen"
  >
    <template #trigger>
      <VcButton
        :class-config="{
          root: 'rounded-xs justify-start px-md py-xs pr-0',
        }"
        variant="unstyled"
      >
        <AppGroup gap="sm">
          <slot name="label" />
        </AppGroup>
      </VcButton>
    </template>

    <template #content>
      <slot name="content" />
    </template>
  </VcPopover>
</template>
