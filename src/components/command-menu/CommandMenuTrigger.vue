<script setup lang="ts">
import {
  useVcDialog,
  VcIcon,
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
                flex h-10 min-w-72 cursor-text items-center justify-between
                gap-md rounded-md border border-solid border-primary
                bg-transparent px-lg outline-offset-0 outline-brand-500
              "
              v-bind="commandMenuDialog.getTriggerProps()"
              @click="commandMenuDialog.open()"
            >
              <AppGroup>
                <Motion layout-id="icon-left">
                  <VcIcon
                    icon="search"
                    class="size-4 text-tertiary"
                  />
                </Motion>

                <Motion
                  layout-id="placeholder"
                  class="
                    inline-block items-center justify-between text-sm
                    whitespace-nowrap text-white/50
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
