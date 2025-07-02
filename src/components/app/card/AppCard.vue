<script setup lang="ts">
/**
 * I think it might be a good idea to have a disabled variant also have
 * a seperate `isDisabled` prop to disable the hover effect
 */
import { computed } from 'vue'

export type CardVariant = 'brand' | 'disabled' | 'transparent'

const props = withDefaults(defineProps<{
  isDisabled?: boolean
  spacing?: 'md' | 'sm'
  variant: CardVariant
}>(), {
  isDisabled: false,
  spacing: 'md',
})

const backgroundColorClass = computed<string>(() => {
  switch (props.variant) {
    case 'brand':
      return 'bg-brand-25'
    case 'disabled':
      return 'bg-primary'
    case 'transparent':
      return 'bg-primary'
  }

  throw new Error(`Unknown variant: ${props.variant}`)
})

const borderColorClass = computed<string>(() => {
  switch (props.variant) {
    case 'brand':
      return 'border-brand-300'
    case 'disabled':
      return 'border-disabled-subtle'
    case 'transparent':
      return 'border-secondary'
  }

  throw new Error(`Unknown variant: ${props.variant}`)
})

const spacingClass = computed<string>(() => {
  if (props.spacing === 'sm') {
    return 'px-xl py-md'
  }

  return 'p-xl'
})
</script>

<template>
  <div
    :class="[
      backgroundColorClass,
      borderColorClass,
      spacingClass,
      {
        'hover:brightness-99': !props.isDisabled,
      },
    ]"
    class="group rounded-xl border border-solid duration-200"
  >
    <slot />
  </div>
</template>
