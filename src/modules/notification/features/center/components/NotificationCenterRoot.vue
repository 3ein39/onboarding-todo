<script setup lang="ts">
import { ref } from 'vue'

import { useProvideNotificationCenterContext } from '@/modules/notification/features/center/components/notificationCenter.context'
import { useNotificationCenter } from '@/modules/notification/features/center/composables/test/notification-center/notificationCenter.composable'
import { NotificationCenterTab } from '@/modules/notification/features/center/types/notificationCenter.type'

const activeTab = ref<NotificationCenterTab>(NotificationCenterTab.UNREAD)

const {
  allNotifications,
  markAllAsRead,
  markAsRead,
  unreadCount,
  unreadNotifications,
} = useNotificationCenter()

useProvideNotificationCenterContext({
  activeTab,
  allNotifications,
  markAllAsRead,
  markAsRead,
  unreadCount,
  unreadNotifications,
})
</script>

<template>
  <slot />
</template>
