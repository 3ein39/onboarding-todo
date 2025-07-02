<script setup lang="ts">
import { computed } from 'vue'

import type { NotificationPreset } from '@/client'
import AppSeparator from '@/components/app/AppSeparator.vue'
import { useApiErrorToast } from '@/composables/api-error-toast/apiErrorToast.composable.ts'
import { useSettingsNotificationGlobalUpdateMutation } from '@/modules/settings/api/mutations/settingsNotificationGlobalUpdate.mutation.ts'
import { useSettingsNotificationPresetUpdateMutation } from '@/modules/settings/api/mutations/settingsNotificationPresetUpdate.mutation.ts'
import { useSettingsNotificationSpecificUpdateMutation } from '@/modules/settings/api/mutations/settingsNotificationSpecificUpdate.mutation.ts'
import { useSettingNotificationQuery } from '@/modules/settings/api/queries/settingsNotification.query.ts'
import { useSettingsNotificationDefaultsQuery } from '@/modules/settings/api/queries/settingsNotificationDefaults.query.ts'
import SettingNotificationsQuickActions from '@/modules/settings/features/notifications/components/SettingsNotificationsQuickActions.vue'
import SettingNotificationsTable from '@/modules/settings/features/notifications/components/SettingsNotificationsTable.vue'
import type { SettingsNotificationPreference } from '@/modules/settings/models/notification/settingsNotification.model.ts'
import type { SettingsNotificationConfig } from '@/modules/settings/models/notification/settingsNotificationConfig.model.ts'
import type { SettingsNotificationGlobalUpdateForm } from '@/modules/settings/models/notification/settingsNotificationGlobalUpdateForm.model.ts'
import type { SettingsNotificationSpecificUpdateForm } from '@/modules/settings/models/notification/settingsNotificationSpecificUpdateForm.model.ts'

const apiErrorToast = useApiErrorToast()

const notificationQuery = useSettingNotificationQuery()

const updateSpecificMutation = useSettingsNotificationSpecificUpdateMutation()
const updateGlobalMutation = useSettingsNotificationGlobalUpdateMutation()
const updatePresetMutation = useSettingsNotificationPresetUpdateMutation()

const defaultsQuery = useSettingsNotificationDefaultsQuery()

const preference = computed<SettingsNotificationPreference>(() => {
  return notificationQuery.data.value ?? {
    appEnabled: false,
    global: {
      app: false,
      email: false,
      push: false,
      sms: false,
    },
    preferences: {
      app: [],
      email: [],
      push: [],
      sms: [],
    },
    preset: null,
  }
})

const defaults = computed<SettingsNotificationConfig[]>(() => defaultsQuery.data.value ?? [])

async function onUpdateSpecific(form: SettingsNotificationSpecificUpdateForm): Promise<void> {
  const result = await updateSpecificMutation.execute({
    body: form,
  })

  if (result.isErr()) {
    apiErrorToast.show(result.error)
  }
}

async function onGlobalUpdate(form: SettingsNotificationGlobalUpdateForm): Promise<void> {
  const result = await updateGlobalMutation.execute({
    body: form,
  })

  if (result.isErr()) {
    apiErrorToast.show(result.error)
  }
}

async function onQuickActionSelect(preset: NotificationPreset): Promise<void> {
  const result = await updatePresetMutation.execute({
    body: preset,
  })

  if (result.isErr()) {
    apiErrorToast.show(result.error)
  }
}
</script>

<template>
  <div class="flex flex-1 flex-col gap-4xl p-xl">
    <SettingNotificationsQuickActions
      :preset="preference.preset"
      @select="onQuickActionSelect"
    />
    <AppSeparator
      variant="quaternary"
      direction="horizontal"
    />
    <SettingNotificationsTable
      :preference="preference"
      :defaults="defaults"
      :error="notificationQuery.error.value"
      @update-specific="onUpdateSpecific"
      @update-global="onGlobalUpdate"
    />
  </div>
</template>
