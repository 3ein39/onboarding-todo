<script setup lang="ts">
import { VcButton } from '@wisemen/vue-core-components'
import {
  AnimatePresence,
  Motion,
} from 'motion-v'
import { useI18n } from 'vue-i18n'

import { useInjectNotificationCenterContext } from '@/modules/notification/features/center/components/notificationCenter.context'

const {
  markAllAsRead, unreadCount,
} = useInjectNotificationCenterContext()

const i18n = useI18n()
</script>

<template>
  <AnimatePresence>
    <Motion
      v-if="unreadCount > 0"
      :initial="{ opacity: 0, filter: 'blur(4px)', x: 20 }"
      :animate="{ opacity: 1, filter: 'blur(0)', x: 0 }"
      :exit="{ opacity: 0, filter: 'blur(4px)', x: 20 }"
      :transition="{
        duration: 0.3,
        type: 'spring',
        bounce: 0,
      }"
    >
      <VcButton
        :class-config="{
          iconLeft: 'size-3',
          root: 'h-7 !pl-sm !pr-md',
        }"
        variant="tertiary"
        size="sm"
        icon-left="check"
        @click="markAllAsRead"
      >
        <span class="text-xs">
          {{ i18n.t('module.notification.notification_center.mark_all_as_read.label') }}
        </span>
      </VcButton>
    </Motion>
  </AnimatePresence>
</template>
