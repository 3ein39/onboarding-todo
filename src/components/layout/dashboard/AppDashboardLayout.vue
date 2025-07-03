<script setup lang="ts">
import { computed } from 'vue'

import AppDashboardLayoutFloating from '@/components/layout/dashboard/AppDashboardLayoutFloating.vue'
import AppHeader from '@/components/layout/header/AppHeader.vue'
import { usePreferencesSync } from '@/composables/preferences/preferences.composable.ts'
import { useQueryErrorToast } from '@/composables/query-error-toast/queryErrorToast.composable.ts'
import type { UserDetail } from '@/models/user/detail/userDetail.model'
import { useAuthStore } from '@/stores/auth.store'

usePreferencesSync()
useQueryErrorToast()

const authStore = useAuthStore()

const authUser = computed<UserDetail | null>(() => authStore.authUser)

function onSignOut(): void {
  const logoutUrl = authStore.getLogoutUrl()

  window.location.replace(logoutUrl)
}
</script>

<template>
  <AppDashboardLayoutFloating v-if="authUser !== null">
    <template #header>
      <AppHeader
        :user="authUser"
        @sign-out="onSignOut"
      />
    </template>
  </AppDashboardLayoutFloating>
</template>
