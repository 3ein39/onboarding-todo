<script setup lang="ts">
import type {
  SettingsConfig,
  SettingsView,
} from '@wisemen/vue-core-modules'
import {
  useAppearanceSetting,
  useFontSizeSetting,
  useKeyboardShortcutHintsSetting,
  useLanguageSetting,
  VcSettings,
  VcSettingsDialog,
} from '@wisemen/vue-core-modules'
import type { VNode } from 'vue'
import {
  computed,
  h,
} from 'vue'
import { useI18n } from 'vue-i18n'

import { Permission } from '@/client'
import { usePreferences } from '@/composables/preferences/preferences.composable.ts'
import { TEST_ID } from '@/constants/testId.constant.ts'
import SettingsDeveloperView from '@/modules/settings/features/developer/views/SettingsDeveloperView.vue'
import SettingsEventLogsView from '@/modules/settings/features/event-logs/views/SettingsEventLogsView.vue'
import SettingsJobView from '@/modules/settings/features/jobs/views/SettingsJobView.vue'
import SettingsNotificationView from '@/modules/settings/features/notifications/views/SettingsNotificationView.vue'
import SettingsRoleAndPermissionView from '@/modules/settings/features/roles-and-permissions/views/SettingsRoleAndPermissionView.vue'
import SettingsUserOverviewView from '@/modules/settings/features/users/components/SettingsUserOverviewView.vue'
import { useAuthStore } from '@/stores/auth.store.ts'

const props = withDefaults(defineProps<{
  defaultView?: string | null
}>(), {
  defaultView: null,
})

const i18n = useI18n()
const authStore = useAuthStore()

const preferences = usePreferences()

const appearanceSetting = useAppearanceSetting()
const languageSetting = useLanguageSetting()
const fontSizeSetting = useFontSizeSetting()
const keyboardShortcutHintsSetting = useKeyboardShortcutHintsSetting()

function getSystemViews(): SettingsView[] {
  const views: SettingsView[] = []

  if (authStore.hasPermission(Permission.EVENT_LOG_READ)) {
    views.push({
      id: 'eventLogs',
      title: i18n.t('module.settings.event_logs.title'),
      icon: 'file',
      sections: [
        {
          id: 'eventLogs',
          title: i18n.t('module.settings.event_logs.title'),
          description: i18n.t('module.settings.event_logs.title'),
          tags: [],
          component: (): VNode => h(SettingsEventLogsView),
        },
      ],
    })
  }

  if (authStore.hasPermission(Permission.JOBS_READ_INDEX)) {
    views.push({
      id: 'jobs',
      title: i18n.t('module.settings.jobs.title'),
      icon: 'file',
      sections: [
        {
          id: 'jobs',
          title: i18n.t('module.settings.jobs.title'),
          description: i18n.t('module.settings.jobs.title'),
          tags: [],
          component: (): VNode => h(SettingsJobView),
        },
      ],
    })
  }

  if (authStore.hasPermission(Permission.ALL_PERMISSIONS)) {
    views.push({
      id: 'developer',
      title: i18n.t('module.settings.developer.title'),
      icon: 'file',
      sections: [
        {
          id: 'developer',
          title: i18n.t('module.settings.developer.title'),
          description: i18n.t('module.settings.developer.title'),
          tags: [],
          component: (): VNode => h(SettingsDeveloperView),
        },
      ],
    })
  }

  return views
}

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
        {
          id: 'notifications',
          title: i18n.t('module.settings.notifications.title'),
          icon: 'notification',
          sections: [
            {
              id: 'notifications',
              title: i18n.t('module.settings.notifications.title'),
              description: i18n.t('module.settings.notifications.title'),
              tags: [],
              component: (): VNode => h(SettingsNotificationView),
            },
          ],
        },
      ],
    },
    {
      title: i18n.t('module.settings.users_and_permissions'),
      views: [
        {
          id: 'users',
          testId: TEST_ID.SETTINGS.SIDEBAR.USER_BUTTON,
          title: i18n.t('module.settings.users'),
          icon: 'users',
          sections: [
            {
              id: 'users',
              title: i18n.t('module.settings.users'),
              description: i18n.t('module.settings.users'),
              tags: [],
              component: (): VNode => h(SettingsUserOverviewView),
            },
          ],
        },
        {
          id: 'permissions',
          title: i18n.t('module.settings.roles_and_permissions'),
          icon: 'shield',
          sections: [
            {
              id: 'rolesPermissions',
              title: i18n.t('module.settings.roles_and_permissions'),
              description: i18n.t('module.settings.roles_and_permissions'),
              tags: [],
              component: (): VNode => h(SettingsRoleAndPermissionView),
            },
          ],
        },
      ],
    },
    {
      title: i18n.t('module.settings.system.title'),
      views: getSystemViews(),
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
