<script setup lang="ts">
import NotificationCenterAll from '@/modules/notification/features/center/components/NotificationCenterAll.vue'
import NotificationCenterHeader from '@/modules/notification/features/center/components/NotificationCenterHeader.vue'
import NotificationCenterPopover from '@/modules/notification/features/center/components/NotificationCenterPopover.vue'
import NotificationCenterRoot from '@/modules/notification/features/center/components/NotificationCenterRoot.vue'
import NotificationCenterTabs from '@/modules/notification/features/center/components/NotificationCenterTabs.vue'
import NotificationCenterUnread from '@/modules/notification/features/center/components/NotificationCenterUnread.vue'
</script>

<template>
  <NotificationCenterRoot>
    <NotificationCenterPopover>
      <NotificationCenterHeader />

      <NotificationCenterTabs>
        <template #unread>
          <NotificationCenterUnread />
        </template>

        <template #all>
          <NotificationCenterAll />
        </template>
      </NotificationCenterTabs>
    </NotificationCenterPopover>
  </NotificationCenterRoot>
</template>
