<script setup lang="ts">
import { VcTooltip } from '@wisemen/vue-core-components'

import { useLocalizedDateFormat } from '@/composables/localized-date-format/localizedDateFormat.composable'
import { useInjectNotificationCenterItemContext } from '@/modules/notification/features/center/components/item/notificationCenterItem.context'

const {
  notification,
} = useInjectNotificationCenterItemContext()

const localizedDateFormat = useLocalizedDateFormat()
</script>

<template>
  <VcTooltip :disable-close-on-trigger-click="true">
    <template #trigger>
      <time
        :datetime="notification.createdAt.toISOString()"
        class="text-xs font-medium whitespace-nowrap text-quaternary capitalize"
      >
        {{ localizedDateFormat.fromNow(notification.createdAt) }}
      </time>
    </template>

    <template #content>
      <span class="flex px-md py-sm text-xs text-primary">
        {{ localizedDateFormat.toDateTime(notification.createdAt) }}
      </span>
    </template>
  </VcTooltip>
</template>
