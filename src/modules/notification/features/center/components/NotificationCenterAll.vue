<script setup lang="ts">
import { useInjectNotificationCenterContext } from '@/modules/notification/features/center/components/notificationCenter.context'
import NotificationCenterContent from '@/modules/notification/features/center/components/NotificationCenterContent.vue'
import NotificationCenterEmpty from '@/modules/notification/features/center/components/NotificationCenterEmpty.vue'
import NotificationCenterLoading from '@/modules/notification/features/center/components/NotificationCenterLoading.vue'

const {
  allNotifications,
} = useInjectNotificationCenterContext()
</script>

<template>
  <NotificationCenterLoading v-if="allNotifications.isLoading.value" />
  <NotificationCenterEmpty v-else-if="allNotifications.isEmpty.value" />
  <NotificationCenterContent
    v-else
    :notifications="allNotifications.data.value"
    @next="allNotifications.nextPage"
  />
</template>
