<script setup lang="ts">
import { useInjectNotificationCenterContext } from '@/modules/notification/features/center/components/notificationCenter.context'
import NotificationCenterContent from '@/modules/notification/features/center/components/NotificationCenterContent.vue'
import NotificationCenterEmpty from '@/modules/notification/features/center/components/NotificationCenterEmpty.vue'
import NotificationCenterLoading from '@/modules/notification/features/center/components/NotificationCenterLoading.vue'

const {
  unreadNotifications,
} = useInjectNotificationCenterContext()
</script>

<template>
  <NotificationCenterLoading v-if="unreadNotifications.isLoading.value" />
  <NotificationCenterEmpty v-else-if="unreadNotifications.isEmpty.value" />
  <NotificationCenterContent
    v-else
    :notifications="unreadNotifications.data.value"
    @next="unreadNotifications.nextPage"
  />
</template>
