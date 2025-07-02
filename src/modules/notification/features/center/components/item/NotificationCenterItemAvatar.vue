<script setup lang="ts">
import {
  VcAvatar,
  VcIcon,
} from '@wisemen/vue-core-components'

import { useInjectNotificationCenterItemContext } from '@/modules/notification/features/center/components/item/notificationCenterItem.context'

const {
  notification,
} = useInjectNotificationCenterItemContext()
</script>

<template>
  <VcAvatar
    v-if="notification.createdByName !== null"
    :class-config="{
      root: 'size-8',
      fallback: 'text-xs font-semibold',
    }"
    :name="notification.createdByName"
  />

  <div
    v-else
    class="
      flex size-8 items-center justify-center rounded-full border border-solid
      border-secondary
    "
  >
    <VcIcon
      icon="bell"
      class="size-4 text-quaternary"
    />
  </div>
</template>
