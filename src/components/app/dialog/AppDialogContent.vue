<script setup lang="ts">
import {
  VcDialogCloseButton,
  VcDialogDescription,
  VcDialogTitle,
} from '@wisemen/vue-core-components'

const props = defineProps<{
  contentDescription?: string
  contentTitle?: string
}>()
</script>

<template>
  <div class="overflow-y-auto px-4xl py-3xl">
    <VcDialogTitle
      class="sr-only"
    >
      <p>{{ props.contentTitle }}</p>
    </VcDialogTitle>
    <VcDialogDescription
      class="sr-only"
    >
      <p>{{ props.contentDescription }}</p>
    </VcDialogDescription>
    <slot />

    <div class="absolute top-2 right-2">
      <VcDialogCloseButton />
    </div>
  </div>
</template>
