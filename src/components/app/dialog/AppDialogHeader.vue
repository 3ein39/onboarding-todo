<script setup lang="ts">
import {
  VcDialogDescription,
  VcDialogTitle,
} from '@wisemen/vue-core-components'

const props = defineProps<{
  title?: string
  description?: string
}>()
</script>

<template>
  <div class="flex flex-col">
    <VcDialogTitle v-if="props.title">
      <h1 class="sr-only text-lg font-semibold text-primary">
        {{ props.title }}
      </h1>
    </VcDialogTitle>

    <VcDialogDescription v-if="props.description">
      <p class="sr-only mt-sm text-secondary">
        {{ props.description }}
      </p>
    </VcDialogDescription>
    <slot />
  </div>
</template>
