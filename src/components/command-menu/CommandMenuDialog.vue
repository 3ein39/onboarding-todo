<script setup lang="ts">
import {
  VcDialogContent,
  VcDialogDescription,
  VcDialogOverlay,
  VcDialogOverlayTransition,
  VcDialogRoot,
  VcDialogTitle,
} from '@wisemen/vue-core-components'
import {
  Motion,
  MotionConfig,
} from 'motion-v'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

import { useCommandMenu } from '@/components/command-menu/commandMenu.composable'
import { useProvideCommandMenuContext } from '@/components/command-menu/commandMenu.context'
import CommandMenuContent from '@/components/command-menu/CommandMenuContent.vue'

const emit = defineEmits<{
  close: []
}>()

const i18n = useI18n()

const {
  isLoadingResults,
  results,
  searchTerm,
} = useCommandMenu()

const highlightedResultId = ref<string | null>(null)

function onClose(): void {
  emit('close')
}

useProvideCommandMenuContext({
  highlightedResultId,
  isLoadingResults,
  results,
  searchTerm,
  onSelectResult: (result) => {
    result.onSelect()
    onClose()
  },
})
</script>

<template>
  <VcDialogRoot
    :class-config="{
      content: 'top-4 translate-y-0 rounded-none bg-secondary/85 border-primary/50 default dark backdrop-blur-sm',
      overlay: 'backdrop-blur-none',
    }"
    @close="onClose"
  >
    <VcDialogOverlay>
      <VcDialogOverlayTransition />
    </VcDialogOverlay>

    <MotionConfig
      :transition="{
        duration: 0.3,
        type: 'spring',
        bounce: 0,
      }"
    >
      <VcDialogContent>
        <Motion
          :animate="{
            borderRadius: '14px',
          }"
          layout-id="dialog"
          class="sm:w-150"
        >
          <VcDialogTitle
            class="sr-only"
          >
            <h1>{{ i18n.t('component.command_menu.aria_title') }}</h1>
          </VcDialogTitle>

          <VcDialogDescription
            class="sr-only"
          >
            <p>{{ i18n.t('component.command_menu.aria_description') }}</p>
          </VcDialogDescription>

          <Motion class="relative">
            <CommandMenuContent />
          </Motion>
        </Motion>
      </VcDialogContent>
    </MotionConfig>
  </VcDialogRoot>
</template>
