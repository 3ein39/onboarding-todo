<script setup lang="ts">
import { NotificationType } from '@/client/types.gen'
import AppInfiniteScroll from '@/components/app/infinite-scroll/AppInfiniteScroll.vue'
import type { NotificationIndex } from '@/models/notification/notificationIndex.model'
import NotificationCenterTestItem from '@/modules/notification/features/center/components/item-types/NotificationCenterTestItem.vue'

const props = defineProps<{
  notifications: NotificationIndex[]
  onNext: () => Promise<void>
}>()
</script>

<template>
  <AppInfiniteScroll
    class="max-h-96 py-xl"
    @next="props.onNext"
  >
    <div class="flex flex-col gap-y-2xl">
      <template
        v-for="notification of props.notifications"
        :key="notification.notificationUuid"
      >
        <NotificationCenterTestItem
          v-if="notification.type === NotificationType.TEST_NOTIFICATION"
          :notification="notification"
        />
      </template>
    </div>
  </AppInfiniteScroll>
</template>
