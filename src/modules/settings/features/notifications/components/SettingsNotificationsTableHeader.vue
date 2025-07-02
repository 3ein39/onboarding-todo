<script setup lang="ts">
import { VcSwitch } from '@wisemen/vue-core-components'
import { useI18n } from 'vue-i18n'

import type { NotificationChannel } from '@/client'
import type { SettingsNotificationPreference } from '@/modules/settings/models/notification/settingsNotification.model.ts'
import { SettingNotificationChannelEnumUtil } from '@/modules/settings/models/notification/settingsNotificationChannel.model.ts'
import type { SettingsNotificationGlobalUpdateForm } from '@/modules/settings/models/notification/settingsNotificationGlobalUpdateForm.model.ts'

const props = defineProps<{
  channels: NotificationChannel[]
  preference: SettingsNotificationPreference
}>()

const emit = defineEmits<{
  updateGlobal: [form: SettingsNotificationGlobalUpdateForm]
}>()

const i18n = useI18n()

function isEnabled(channel: NotificationChannel): boolean {
  return props.preference.global[channel]
}

function onUpdate(isEnabled: boolean, channel: NotificationChannel): void {
  emit('updateGlobal', {
    isEnabled,
    channel,
  })
}
</script>

<template>
  <div
    class="
      sticky top-0 z-2 col-span-full grid grid-cols-subgrid border-b
      border-solid border-secondary
    "
  >
    <div
      class="
        sticky left-0 z-1 flex items-center gap-2 border-r border-solid
        border-secondary bg-primary p-3 px-6 text-sm text-secondary
      "
    >
      <span>
        {{ i18n.t('shared.global') }}
      </span>
    </div>
    <div
      v-for="channel of props.channels"
      :key="channel"
      class="
        border-r border-solid border-secondary
        last:border-none
      "
    >
      <div
        class="
          flex flex-col items-center justify-center gap-4 p-3 px-6 text-nowrap
          text-secondary
        "
      >
        <span class="text-xs">
          {{ i18n.t(SettingNotificationChannelEnumUtil.getI18nKey(channel)) }}
        </span>

        <VcSwitch
          :model-value="isEnabled(channel)"
          size="sm"
          @update:model-value="(event) => onUpdate(event, channel)"
        />
      </div>
    </div>
  </div>
</template>
