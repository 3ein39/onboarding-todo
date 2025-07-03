<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import AppDashboardLayoutFloating from '@/components/layout/dashboard/AppDashboardLayoutFloating.vue'
import AppHeader from '@/components/layout/header/AppHeader.vue'
import AppSidebar from '@/components/layout/sidebar/AppSidebar.vue'
import { usePreferencesSync } from '@/composables/preferences/preferences.composable.ts'
import { useQueryErrorToast } from '@/composables/query-error-toast/queryErrorToast.composable.ts'
import type { UserDetail } from '@/models/user/detail/userDetail.model'
import { useAuthStore } from '@/stores/auth.store'
import type { NavigationGroup } from '@/types/navigationItem.type.ts'

const i18n = useI18n()

usePreferencesSync()
useQueryErrorToast()

const authStore = useAuthStore()

const authUser = computed<UserDetail | null>(() => authStore.authUser)

function onSignOut(): void {
  const logoutUrl = authStore.getLogoutUrl()

  window.location.replace(logoutUrl)
}

const mainItems = computed<NavigationGroup[]>(() => [
  {
    items: [
      {
        icon: 'userSquare',
        label: i18n.t('module.contact.title'),
        to: {
          name: 'contact-overview',
        },
      },
      {
        icon: 'userSquare',
        label: i18n.t('module.todo.title'),
        to: {
          name: 'todo-overview',
        },
      },
    ],
    label: 'General',
  },
])
</script>

<template>
  <AppDashboardLayoutFloating v-if="authUser !== null">
    <template #sidebar>
      <AppSidebar
        :user="authUser"
        :main-items="mainItems"
        variant="floating-content"
      />
    </template>

    <template #header>
      <AppHeader
        :user="authUser"
        @sign-out="onSignOut"
      />
    </template>
  </AppDashboardLayoutFloating>
</template>
