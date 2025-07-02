import { useLocalStorage } from '@vueuse/core'
import type { DefaultPreferences } from '@wisemen/vue-core-modules'
import { watch } from 'vue'
import { useI18n } from 'vue-i18n'

import { client } from '@/client/client.gen'
import { useApiErrorToast } from '@/composables/api-error-toast/apiErrorToast.composable.ts'
import { onCreated } from '@/composables/created/created.composable.ts'
import { SettingsPreferenceService } from '@/modules/settings'
import { i18nPlugin } from '@/plugins/i18n.plugin'

const preferences = useLocalStorage<DefaultPreferences>('preferences', {
  appearance: 'light',
  enableHighContrast: false,
  enableKeyboardShortcutHints: true,
  fontSize: 'default',
  language: i18nPlugin.global.locale.value,
})

export function usePreferences() {
  return preferences
}

export function useFontSizePreference() {
  const fontSizeMap = new Map<DefaultPreferences['fontSize'], number>([
    [
      'smaller',
      12,
    ],
    [
      'small',
      14,
    ],
    [
      'default',
      16,
    ],
    [
      'large',
      18,
    ],
    [
      'larger',
      20,
    ],
  ])

  watch(() => preferences.value.fontSize, (value) => {
    document.startViewTransition(() => {
      document.documentElement.style.fontSize = `${fontSizeMap.get(value)}px`
    })
  }, {
    immediate: true,
  })
}

export function useLanguagePreference() {
  const i18n = useI18n()

  watch(() => preferences.value.language, (value) => {
    if (value === undefined) {
      return
    }

    i18n.locale.value = value

    client.setConfig({
      headers: {
        'Accept-Language': value,
      },
    })
  }, {
    immediate: true,
  })
}
export function usePreferencesSync() {
  const apiErrorToast = useApiErrorToast()
  const i18n = useI18n()

  onCreated(async () => {
    const response = await SettingsPreferenceService.get()

    if (response.isErr()) {
      apiErrorToast.show(response.error)

      return
    }

    preferences.value = {
      appearance: response.value.theme ?? 'system',
      enableHighContrast: response.value.highContrast ?? false,
      enableKeyboardShortcutHints: response.value.showShortcuts ?? true,
      fontSize: response.value.fontSize ?? 'default',
      language: response.value.language ?? i18n.locale.value,
    }
  })

  watch(preferences, async (updatedPreferences) => {
    const response = await SettingsPreferenceService.updateDefault(updatedPreferences)

    if (response.isErr()) {
      apiErrorToast.show(response.error)
    }
  }, {
    deep: true,
  })
}
