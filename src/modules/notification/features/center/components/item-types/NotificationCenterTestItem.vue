<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import type { NotificationTest } from '@/models/notification/notificationIndex.model'
import NotificationCenterItem from '@/modules/notification/features/center/components/item/NotificationCenterItem.vue'

const props = defineProps<{
  notification: NotificationTest
}>()

const i18n = useI18n()
</script>

<template>
  <NotificationCenterItem :notification="props.notification">
    <template #title>
      <em class="font-bold not-italic">
        {{ props.notification.createdByName ?? i18n.t('module.notification.notification_center.test_notification.someone') }}
      </em> {{ i18n.t('module.notification.notification_center.test_notification.title') }}
    </template>

    <template #content>
      <p
        class="
          w-full rounded-md bg-secondary p-md text-sm wrap-anywhere text-primary
        "
      >
        {{ props.notification.meta.message }}
      </p>
    </template>
  </NotificationCenterItem>
</template>
