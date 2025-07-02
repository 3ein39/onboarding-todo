<script setup lang="ts">
import {
  VcButton,
  VcDialogContent,
  VcDialogDescription,
  VcDialogOverlay,
  VcDialogOverlayTransition,
  VcDialogPortal,
  VcDialogRoot,
  VcDialogTitle,
} from '@wisemen/vue-core-components'
import { Motion } from 'motion-v'

import AppGroup from '@/components/app/group/AppGroup.vue'

const props = defineProps<{
  x: number
  y: number
}>()

const emit = defineEmits<{
  close: []
}>()
</script>

<template>
  <VcDialogRoot
    :class-config="{
      content: '-translate-x-full translate-y-0 rounded-xl bg-gradient-to-br from-primary/80 to-error-50/75',
      overlay: 'backdrop-blur-xs',
    }"
    @close="emit('close')"
  >
    <VcDialogPortal>
      <VcDialogContent>
        <Motion
          :style="{
            top: `${props.y}px`,
            left: `${props.x}px`,
          }"
          :transition="{
            duration: 0.4,
            type: 'spring',
            bounce: 0.2,
          }"
          :initial="{ filter: 'blur(12px)' }"
          :animate="{ filter: 'blur(0px)' }"
          :exit="{ filter: 'blur(12px)' }"
          layout-id="delete-dialog"
          class="w-76 p-xl pt-lg"
        >
          <AppGroup
            justify="between"
            align="center"
          >
            <VcDialogTitle>
              <Motion
                :as-child="true"
                :transition="{
                  duration: 0.4,
                  type: 'spring',
                  bounce: 0.2,
                }"
                layout-id="delete-dialog-label"
              >
                <h1
                  class="mr-2xl text-md font-semibold text-primary"
                >
                  Delete contact
                </h1>
              </Motion>
            </VcDialogTitle>

            <VcButton
              :class-config="{
                root: 'bg-error-primary not-disabled:not-[data-loading]:hover:brightness-98 h-8',
              }"
              variant="destructive-tertiary"
              size="sm"
              class="shrink-0"
              icon-left="trash"
              @click="emit('close')"
            >
              Delete
            </VcButton>
          </AppGroup>

          <VcDialogDescription v-if="true">
            <p class="mt-xs max-w-48 text-sm text-secondary">
              Are you sure you want to delete this contact?
            </p>
          </VcDialogDescription>
        </Motion>
      </VcDialogContent>

      <VcDialogOverlay>
        <VcDialogOverlayTransition />
      </VcDialogOverlay>
    </VcDialogPortal>
  </VcDialogRoot>
</template>
