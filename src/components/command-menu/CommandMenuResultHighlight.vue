<script setup lang="ts">
import { VcKeyboardKey } from '@wisemen/vue-core-components'
import {
  AnimatePresence,
  Motion,
} from 'motion-v'

import { useInjectCommandMenuContext } from '@/components/command-menu/commandMenu.context'
import type { CommandMenuResult } from '@/components/command-menu/commandMenu.type'

const props = defineProps<{
  result: CommandMenuResult
}>()

const {
  highlightedResultId,
} = useInjectCommandMenuContext()
</script>

<template>
  <AnimatePresence>
    <Motion
      v-if="props.result.id === highlightedResultId"
      :transition="{ duration: 0.3, bounce: 0.15, type: 'spring' }"
      :exit="{ opacity: 0 }"
      :animate="{ opacity: 1 }"
      :initial="{ opacity: 0 }"
      layout-id="command-menu-result-highlight"
      class="
        absolute inset-0 -z-1 flex items-center justify-end rounded-md
        bg-primary
      "
    >
      <VcKeyboardKey
        :class-config="{
          key: 'dark:!bg-white/10',
        }"
        keyboard-key="enter"
        class="mr-lg"
      />
    </Motion>
  </AnimatePresence>
</template>
