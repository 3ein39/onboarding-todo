<script setup lang="ts">
import {
  VcDialogContent,
  VcDialogOverlay,
  VcDialogOverlayTransition,
  VcDialogRoot,
} from '@wisemen/vue-core-components'
import { Motion } from 'motion-v'
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
          y: '0rem',
        }"
        :exit="{
          y: '4rem',
          opacity: 0,
        }"
        :transition="{
          duration: 0.6,
          type: 'spring',
          bounce: 0,
        }"
        class="h-80 w-140"
      />
    </VcDialogContent>

    <VcDialogOverlay>
      <VcDialogOverlayTransition />
    </VcDialogOverlay>
  </VcDialogRoot>
</template>
