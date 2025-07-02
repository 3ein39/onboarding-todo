<script setup lang="ts">
import {
  useVcDialog,
  VcButton,
  VcDialogContent,
  VcDialogOverlay,
  VcDialogOverlayTransition,
  VcDialogRoot,
} from '@wisemen/vue-core-components'
import { Motion } from 'motion-v'

const dialog = useVcDialog({
  component: () => import('./NestedDialog.vue'),
})
</script>

<template>
  <VcDialogRoot
    :class-config="{
      // content: 'top-8 translate-y-0',
    }"
  >
    <VcDialogContent>
      <Motion
        :initial="{
          opacity: 0,
          y: '4rem',
        }"
        :animate="{
          opacity: 1,
          y: dialog.isOpen() ? '-24px' : '0px',
          scale: dialog.isOpen() ? 0.95 : 1,
          filter: dialog.isOpen() ? 'brightness(75%)' : 'brightness(100%)',
        }"
        :exit="{
          opacity: 0,
          y: '4rem',
        }"
        :transition="{
          duration: 0.6,
          type: 'spring',
          bounce: 0,
        }"
        class="flex h-80 w-140 items-center justify-center"
      >
        <VcButton @click="dialog.open()">
          Open dialog
        </VcButton>
      </Motion>
    </VcDialogContent>

    <VcDialogOverlay>
      <VcDialogOverlayTransition />
    </VcDialogOverlay>
  </VcDialogRoot>
</template>
