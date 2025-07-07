<script setup lang="ts">
import {
  VcIconButton,
  VcKeyboardShortcutProvider,
} from '@wisemen/vue-core-components'
import { useI18n } from 'vue-i18n'

import AppButtonTooltip from '@/components/app/tooltip/AppButtonTooltip.vue'
import { TEST_ID } from '@/constants/testId.constant.ts'
import { useSettingsDialog } from '@/modules/settings'

const i18n = useI18n()

const dialog = useSettingsDialog()
</script>

<template>
  <VcKeyboardShortcutProvider :keyboard-keys="['g', 's']">
    <AppButtonTooltip
      :label="i18n.t('component.sidebar.settings')"
      :keyboard-shortcut-keys="['g', 's']"
    >
      <VcIconButton
        v-bind="dialog.getTriggerProps()"
        :label="i18n.t('component.sidebar.settings')"
        :class-config="{
          root: 'text-primary data-[loading=false]:not-disabled:hover:bg-primary/10 rounded-full',
        }"
        :test-id="TEST_ID.SETTINGS.OPEN_DIALOG_BUTTON"
        variant="tertiary"
        icon="settings"
        @click="dialog.open()"
      />
    </AppButtonTooltip>
  </VcKeyboardShortcutProvider>
</template>
