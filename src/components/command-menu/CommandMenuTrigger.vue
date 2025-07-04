<script setup lang="ts">
import {
  useVcDialog,
  VcKeyboardShortcut,
  VcKeyboardShortcutProvider,
  VcThemeProvider,
} from '@wisemen/vue-core-components'
import {
  AnimatePresence,
  Motion,
  MotionConfig,
} from 'motion-v'
import { useI18n } from 'vue-i18n'

import AppGroup from '@/components/app/group/AppGroup.vue'

const i18n = useI18n()

const commandMenuDialog = useVcDialog({
  component: () => import('@/components/command-menu/CommandMenuDialog.vue'),
})
</script>

<template>
  <VcThemeProvider appearance="dark">
    <MotionConfig
      :transition="{
        duration: 0.3,
        type: 'spring',
        bounce: 0,
      }"
    >
      <AnimatePresence>
        <Motion
          v-if="!commandMenuDialog.isOpen()"
          layout-id="dialog"
        >
          <VcKeyboardShortcutProvider :keyboard-keys="['meta', 'k']">
            <button
              type="button"
              class="
                flex h-10 w-md min-w-72 cursor-text items-center justify-between
                gap-md rounded-md border border-(--solitude) bg-white px-lg
                outline-offset-0 outline-brand-500
                sm:w-xl
              "
              v-bind="commandMenuDialog.getTriggerProps()"
              @click="commandMenuDialog.open()"
            >
              <AppGroup>
                <Motion
                  layout-id="placeholder"
                  class="
                    inline-block items-center justify-between text-sm
                    whitespace-nowrap text-black !opacity-30
                  "
                >
                  {{ i18n.t('component.command_menu.placeholder') }}
                </Motion>
              </AppGroup>

              <VcKeyboardShortcut
                :class-config="{
                  keyboardKey: {
                    key: '!bg-brand-700',
                  },
                }"
                :keyboard-keys="['meta', 'k']"
              />
            </button>
          </VcKeyboardShortcutProvider>
        </Motion>
      </AnimatePresence>
    </MotionConfig>
  </VcThemeProvider>
</template>
