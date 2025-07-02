<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import NotificationCenterItemSkeleton from '@/modules/notification/features/center/components/NotificationCenterItemSkeleton.vue'

const i18n = useI18n()
</script>

<template>
  <div class="flex-col px-xl py-4xl text-center">
    <div
      class="
        mask-b-from-primary
        dark:mask-b-to-85%
      "
    >
      <NotificationCenterItemSkeleton :shimmer="false" />
    </div>

    <div
      class="
        absolute inset-0 z-1 from-transparent to-primary
        dark:bg-gradient-to-b
      "
    />

    <p
      class="
        absolute top-1/2 left-1/2 z-2 -translate-x-1/2 -translate-y-1/2 text-sm
        font-medium text-secondary
      "
    >
      {{ i18n.t('module.notification.notification_center.empty.text') }}
    </p>
  </div>
</template>
