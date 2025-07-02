<script setup lang="ts">
import {
  VcCheckbox,
  VcIcon,
} from '@wisemen/vue-core-components'
import { ref } from 'vue'

import type {
  NotificationChannel,
  NotificationType,
} from '@/client'
import AppUnstyledButton from '@/components/app/button/AppUnstyledButton.vue'
import AppHeightTransition from '@/components/app/transition/AppHeightTransition.vue'
import type {
  SettingsNotification,
  SettingsNotificationPreference,
} from '@/modules/settings/models/notification/settingsNotification.model.ts'
import type { SettingsNotificationConfig } from '@/modules/settings/models/notification/settingsNotificationConfig.model.ts'
import type { SettingsNotificationSpecificUpdateForm } from '@/modules/settings/models/notification/settingsNotificationSpecificUpdateForm.model.ts'

const props = defineProps<{
  isTableScrolledToBottom: boolean
  channels: NotificationChannel[]
  defaults: SettingsNotificationConfig[]
  notifications: SettingsNotification[]
  preference: SettingsNotificationPreference
}>()

const emit = defineEmits<{
  updateSpecific: [form: SettingsNotificationSpecificUpdateForm]
}>()

const selectedKeys = ref<string[]>([])

function onTogglePermissionActionsClick(key: string): void {
  if (isPermissionTabOpen(key)) {
    selectedKeys.value = selectedKeys.value.filter((item) => item !== key)

    return
  }

  selectedKeys.value.push(key)
}

function isPermissionTabOpen(key: string): boolean {
  return selectedKeys.value.includes(key)
}

function isParentCheckboxChecked(key: string, channel: NotificationChannel): boolean {
  const allActions = props.notifications.find((item) => item.key === key)?.actions ?? []

  const preferencesForChannel = props.preference.preferences[channel].filter((item) => item.split('.')[0] === key)

  return allActions.length === preferencesForChannel.length
}

function isActionCheckboxChecked(type: NotificationType, channel: NotificationChannel): boolean {
  return props.preference.preferences[channel].includes(type)
}

function isActionCheckboxVisible(type: NotificationType, channel: NotificationChannel): boolean {
  const defaultType = props.defaults.find((item) => item.type === type)
  const channelConfig = defaultType?.channels.find((value) => value.channel === channel)

  return channelConfig?.isSupported ?? true
}

function isParentCheckboxVisible(key: string, channel: NotificationChannel): boolean {
  const notifications = props.notifications.find((item) => item.key === key)

  const allActions = notifications?.actions?.map((action) => isActionCheckboxVisible(action, channel)) ?? []

  return allActions.some((item) => item)
}

function isParentCheckboxIndeterminate(key: string, channel: NotificationChannel): boolean {
  if (isParentCheckboxChecked(key, channel)) {
    return false
  }

  const preferencesForChannel = props.preference.preferences[channel].filter((item) => item.split('.')[0] === key)

  return preferencesForChannel.length > 0
}

function isChannelEnabled(channel: NotificationChannel): boolean {
  return props.preference.global[channel]
}

function onUpdateParentCheckbox(isChecked: boolean, key: string, channel: NotificationChannel): void {
  const allActions = props.notifications.find((item) => item.key === key)?.actions ?? []

  updateSpecific({
    isEnabled: isChecked,
    channel,
    types: allActions,
  })
}

function updateSpecific(form: SettingsNotificationSpecificUpdateForm): void {
  emit('updateSpecific', form)
}

function onUpdateActionCheckbox(isChecked: boolean, type: NotificationType, channel: NotificationChannel): void {
  updateSpecific({
    isEnabled: isChecked,
    channel,
    types: [
      type,
    ],
  })
}
</script>

<template>
  <div
    v-for="notification of props.notifications"
    :key="notification.key"
    :class="{
      'last:border-b-transparent': props.isTableScrolledToBottom,
    }"
    class="
      col-span-full grid grid-cols-subgrid border-b border-solid
      border-secondary
    "
  >
    <div
      class="z-2 col-span-full grid grid-cols-subgrid"
    >
      <Component
        :is="AppUnstyledButton"
        :class="{
          'hover:bg-brand-500': false,
        }"
        class="
          sticky left-0 flex items-center justify-between border-r border-solid
          border-secondary bg-primary p-3 px-6 text-left text-xs font-medium
          text-secondary uppercase !ring-offset-0
        "
        @click="onTogglePermissionActionsClick(notification.key)"
      >
        {{ notification.key }}

        <VcIcon
          v-if="true"
          :icon="isPermissionTabOpen(notification.key) ? 'chevronUp' : 'chevronDown'"
          class="size-4"
        />
      </Component>

      <div
        v-for="channel of props.channels"
        :key="channel"
        class="
          flex items-center justify-center border-r border-solid
          border-secondary p-3
          last:border-none
        "
      >
        <VcCheckbox
          v-show="isParentCheckboxVisible(notification.key, channel)"
          :model-value="isParentCheckboxChecked(notification.key, channel)"
          :is-indeterminate="isParentCheckboxIndeterminate(notification.key, channel)"
          :is-disabled="!isChannelEnabled(channel)"
          :style-config="{
            '--checkbox-bg-color-checked': 'var(--success-300)',
            '--checkbox-border-color-checked': 'var(--success-300)',
          }"
          @update:model-value="(event) => onUpdateParentCheckbox(event, notification.key, channel)"
        />
      </div>
    </div>

    <AppHeightTransition
      :duration="0.2"
    >
      <div
        v-if="isPermissionTabOpen(notification.key)"
        class="col-span-full grid grid-cols-subgrid items-start"
      >
        <div
          v-for="(action, index) in notification.actions"
          :key="action"
          class="
            col-span-full grid grid-cols-subgrid border-b border-secondary
            first:border-t
            last:border-b-0
          "
        >
          <div
            class="
              sticky left-0 flex gap-2 border-r border-secondary bg-tertiary p-3
              pl-10 text-secondary
            "
          >
            <VcIcon
              :class="{
                'opacity-100': index === 0,
              }"
              icon="bottomLeftCorner"
              class="mt-0.5 size-3 text-quaternary opacity-0"
            />
            <span class="text-sm">
              {{ action.split('.')[1] }}
            </span>
          </div>

          <div
            v-for="channel of props.channels"
            :key="channel"
            class="
              flex justify-center border-r border-solid border-secondary
              bg-tertiary p-3
              last:border-none
            "
          >
            <VcCheckbox
              v-show="isActionCheckboxVisible(action, channel)"
              :model-value="isActionCheckboxChecked(action, channel)"
              :is-disabled="!isChannelEnabled(channel)"
              :style-config="{
                '--checkbox-bg-color-checked': 'var(--success-300)',
                '--checkbox-border-color-checked': 'var(--success-300)',
              }"
              @update:model-value="(event) => onUpdateActionCheckbox(event, action, channel)"
            />
          </div>
        </div>
      </div>
    </AppHeightTransition>
  </div>
</template>
