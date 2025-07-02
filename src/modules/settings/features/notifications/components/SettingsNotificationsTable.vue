<script setup lang="ts">
import { useScroll } from '@vueuse/core'
import {
  computed,
  ref,
} from 'vue'

import {
  NotificationChannel,
  NotificationType,
} from '@/client'
import AppErrorState from '@/components/app/error-state/AppErrorState.vue'
import SettingNotificationsTableBody from '@/modules/settings/features/notifications/components/SettingsNotificationsTableBody.vue'
import SettingNotificationsTableHeader from '@/modules/settings/features/notifications/components/SettingsNotificationsTableHeader.vue'
import type {
  SettingsNotification,
  SettingsNotificationPreference,
} from '@/modules/settings/models/notification/settingsNotification.model.ts'
import type { SettingsNotificationConfig } from '@/modules/settings/models/notification/settingsNotificationConfig.model.ts'
import type { SettingsNotificationGlobalUpdateForm } from '@/modules/settings/models/notification/settingsNotificationGlobalUpdateForm.model.ts'
import type { SettingsNotificationSpecificUpdateForm } from '@/modules/settings/models/notification/settingsNotificationSpecificUpdateForm.model.ts'
import { ApiErrorUtil } from '@/utils/apiError.util'

const props = defineProps<{
  defaults: SettingsNotificationConfig[]
  error: unknown | null
  preference: SettingsNotificationPreference
}>()

const emit = defineEmits<{
  updateGlobal: [form: SettingsNotificationGlobalUpdateForm]
  updateSpecific: [form: SettingsNotificationSpecificUpdateForm]
}>()

const tableScrollContainerRef = ref<HTMLElement | null>(null)

const scroll = useScroll(tableScrollContainerRef)

const isTableScrolledToBottom = computed<boolean>(() => {
  const canScroll = !scroll.arrivedState.bottom || !scroll.arrivedState.top

  if (!canScroll) {
    return false
  }

  return scroll.arrivedState.bottom
})

const channels = Object.values(NotificationChannel)

const gridColsStyle = computed<string>(() => {
  return `10rem ${channels.map(() => `minmax(8rem, auto)`).join(' ')}`
})

const notifications = computed<SettingsNotification[]>(() => {
  const result: SettingsNotification[] = []

  for (const type of Object.values(NotificationType)) {
    const notification = type.split('.')

    const key = notification[0]

    const notificationKey = result.find((item) => item.key === key) ?? null

    if (notificationKey === null) {
      result.push({
        actions: [
          type,
        ],
        key,
      })
    }
    else {
      notificationKey.actions.push(type)
    }
  }

  return result
})

function onUpdateSpecific(form: SettingsNotificationSpecificUpdateForm): void {
  emit('updateSpecific', form)
}

function onUpdateGlobal(form: SettingsNotificationGlobalUpdateForm): void {
  emit('updateGlobal', form)
}
</script>

<template>
  <AppErrorState
    v-if="props.error !== null && ApiErrorUtil.isError(props.error)"
    :error="props.error"
  />

  <div
    v-else
    class="flex w-full flex-1 flex-col overflow-hidden"
  >
    <div
      ref="tableScrollContainerRef"
      :style="{
        gridTemplateColumns: gridColsStyle,
      }"
      class="grid overflow-auto"
    >
      <SettingNotificationsTableHeader
        :preference="props.preference"
        :channels="channels"
        @update-global="onUpdateGlobal"
      />

      <SettingNotificationsTableBody
        :channels="channels"
        :defaults="props.defaults"
        :preference="props.preference"
        :notifications="notifications"
        :is-table-scrolled-to-bottom="isTableScrolledToBottom"
        @update-specific="onUpdateSpecific"
      />
    </div>
  </div>
</template>
