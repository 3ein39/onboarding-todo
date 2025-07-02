<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import AppGroup from '@/components/app/group/AppGroup.vue'
import NotificationCenterMarkAllAsRead from '@/modules/notification/features/center/components/NotificationCenterMarkAllAsRead.vue'

const i18n = useI18n()
</script>

<template>
  <header class="p-xl pb-0">
    <AppGroup justify="between">
      <h1 class="text-lg font-bold text-primary">
        {{ i18n.t('module.notification.notification_center.title') }}
      </h1>

      <NotificationCenterMarkAllAsRead />
    </AppGroup>
  </header>
</template>
