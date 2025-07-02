<script setup lang="ts">
import {
  useVcDialog,
  VcButton,
} from '@wisemen/vue-core-components'

const dialog = useVcDialog({
  component: () => import('./ExampleDialog.vue'),
})
</script>

<template>
  <div class="flex h-dvh items-center justify-center">
    <VcButton @click="dialog.open">
      Open dialog
    </VcButton>
  </div>
</template>
