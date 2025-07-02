<script setup lang="ts">
import {
  VcConfigProvider,
  VcDialogContainer,
  VcLayoutStackRoot,
  VcThemeProvider,
  VcToastContainer,
} from '@wisemen/vue-core-components'
import { useI18n } from 'vue-i18n'
import {
  RouterView,
  useRouter,
} from 'vue-router'

import AppPageLoader from '@/components/app/loader/AppPageLoader.vue'
import { useAutoRefresh } from '@/composables/auto-refresh/autoRefresh.composable.ts'
import { useDocumentTitle } from '@/composables/document-title/documentTitle.composable'
import {
  useFontSizePreference,
  useLanguagePreference,
  usePreferences,
} from '@/composables/preferences/preferences.composable.ts'
import {
  GOOGLE_MAPS_API_KEY,
  logBuildInformation,
} from '@/constants/environment.constant.ts'
import { useAuthStore } from '@/stores/auth.store.ts'

const i18n = useI18n()
const router = useRouter()
const authStore = useAuthStore()
const documentTitle = useDocumentTitle()

documentTitle.setTemplate('{title} | Project Name')

useAutoRefresh()
useFontSizePreference()
useLanguagePreference()

const preferences = usePreferences()

logBuildInformation()

authStore.onLogout(() => {
  router.replace({
    name: 'auth-login',
  })
})
</script>

<template>
  <VcConfigProvider
    :are-keyboard-shortcut-hints-hidden="!preferences.enableKeyboardShortcutHints"
    :locale="i18n.locale.value"
    :google-maps-api-key="GOOGLE_MAPS_API_KEY"
    teleport-target-selector="body"
  >
    <VcThemeProvider
      :theme="preferences.enableHighContrast ? 'high-contrast' : 'default'"
      :appearance="preferences.appearance"
    >
      <AppPageLoader />

      <VcLayoutStackRoot>
        <RouterView />
        <VcDialogContainer />
      </VcLayoutStackRoot>

      <VcToastContainer />
    </VcThemeProvider>
  </VcConfigProvider>
</template>
