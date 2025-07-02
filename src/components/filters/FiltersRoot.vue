<script setup lang="ts">
import { useEventListener } from '@vueuse/core'
import {
  computed,
  ref,
} from 'vue'

import type { Filters } from '@/components/filters/filters.composable'
import { useProvideFiltersContext } from '@/components/filters/filters.context'

const props = defineProps<{
  filters: Filters<any>
}>()

/**
 * The DropdownMenu component isn't primarily designed to support non-DropdownMenu elements.
 * To ensure accessibility works correctly with a listbox, we need to autofocus it. However, this can be
 * a bit buggy when interacting with the menu using a mouse.
 *
 * To address this, we track whether the user has interacted with the page via keyboard or mouse.
 */
const hasInteractedViaKeyboard = ref<boolean>(false)

useEventListener('keydown', () => {
  hasInteractedViaKeyboard.value = true
})

useEventListener('mousemove', () => {
  hasInteractedViaKeyboard.value = false
})

useProvideFiltersContext({
  ...props.filters,
  hasInteractedViaKeyboard: computed<boolean>(() => hasInteractedViaKeyboard.value),
})
</script>

<template>
  <slot />
</template>
