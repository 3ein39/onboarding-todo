<script setup lang="ts">
import type { NotificationIndex } from '@/models/notification/notificationIndex.model'
import NotificationCenterItemAvatar from '@/modules/notification/features/center/components/item/NotificationCenterItemAvatar.vue'
import NotificationCenterItemHeader from '@/modules/notification/features/center/components/item/NotificationCenterItemHeader.vue'
import NotificationCenterItemMarkAsRead from '@/modules/notification/features/center/components/item/NotificationCenterItemMarkAsRead.vue'
import NotificationCenterItemRoot from '@/modules/notification/features/center/components/item/NotificationCenterItemRoot.vue'
import NotificationCenterItemTime from '@/modules/notification/features/center/components/item/NotificationCenterItemTime.vue'
import NotificationCenterItemTitle from '@/modules/notification/features/center/components/item/NotificationCenterItemTitle.vue'

const props = defineProps<{
  notification: NotificationIndex
}>()
</script>

<template>
  <NotificationCenterItemRoot :notification="props.notification">
    <div class="grid grid-cols-[auto_1fr] gap-x-2xl px-xl">
      <NotificationCenterItemAvatar />

      <div>
        <NotificationCenterItemHeader>
          <NotificationCenterItemTitle>
            <slot name="title" /> <NotificationCenterItemTime />
          </NotificationCenterItemTitle>

          <NotificationCenterItemMarkAsRead />
        </NotificationCenterItemHeader>

        <slot name="content" />
      </div>
    </div>
  </NotificationCenterItemRoot>
</template>
