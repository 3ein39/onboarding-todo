<script setup lang="ts">
import { VcPopover } from '@wisemen/vue-core-components'

import AnimateHeight from '@/components/app/transition/AnimateHeight.vue'
import { useInjectNotificationCenterContext } from '@/modules/notification/features/center/components/notificationCenter.context'
import NotificationCenterTrigger from '@/modules/notification/features/center/components/NotificationCenterTrigger.vue'
import { NotificationCenterTab } from '@/modules/notification/features/center/types/notificationCenter.type'

const {
  activeTab,
} = useInjectNotificationCenterContext()

function onUpdateIsOpen(isOpen: boolean): void {
  if (!isOpen) {
    activeTab.value = NotificationCenterTab.UNREAD
  }
}
</script>

<template>
  <VcPopover
    :popover-align-offset="-20"
    popover-align="end"
    @update:is-open="onUpdateIsOpen"
  >
    <template #trigger>
      <NotificationCenterTrigger />
    </template>

    <template #content>
      <AnimateHeight>
        <div class="w-96">
          <slot />
        </div>
      </AnimateHeight>
    </template>
  </VcPopover>
</template>
