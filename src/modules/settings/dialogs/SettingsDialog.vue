<script setup lang="ts">
import type { SettingsConfig } from '@wisemen/vue-core-modules'
import {
  useAppearanceSetting,
  useFontSizeSetting,
  useKeyboardShortcutHintsSetting,
  useLanguageSetting,
  VcSettings,
  VcSettingsDialog,
} from '@wisemen/vue-core-modules'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import { usePreferences } from '@/composables/preferences/preferences.composable.ts'
import { TEST_ID } from '@/constants/testId.constant.ts'

const props = withDefaults(defineProps<{
  defaultView?: string | null
}>(), {
  defaultView: null,
})

const i18n = useI18n()

const preferences = usePreferences()

const appearanceSetting = useAppearanceSetting()
const languageSetting = useLanguageSetting()
const fontSizeSetting = useFontSizeSetting()
const keyboardShortcutHintsSetting = useKeyboardShortcutHintsSetting()

const config = computed<SettingsConfig>(() => ({
  categories: [
    {
      title: i18n.t('module.settings.general_settings'),
      views: [
        {
          id: 'appearance',
          title: i18n.t('module.settings.appearance'),
          icon: 'brush',
          sections: [
            appearanceSetting,
            languageSetting,
            fontSizeSetting,
            keyboardShortcutHintsSetting,
          ],
        },
      ],
    },
  ],
}))
</script>

<template>
  <VcSettingsDialog>
    <div id="settings-dialog" />
    <VcSettings
      v-model:default-preferences="preferences"
      :data-test-id="TEST_ID.SETTINGS.DIALOG"
      :config="config"
      :active-view="props.defaultView ?? undefined"
    >
      <template #header-right>
        <div id="settings-actions" />
      </template>
    </VcSettings>
  </VcSettingsDialog>
</template>
