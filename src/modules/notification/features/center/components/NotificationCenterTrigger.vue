<script setup lang="ts">
import NumberFlow from '@number-flow/vue'
import {
  VcBadge,
  VcIconButton,
  VcKeyboardShortcutProvider,
} from '@wisemen/vue-core-components'
import {
  AnimatePresence,
  Motion,
} from 'motion-v'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import { useNotificationUnreadCountQuery } from '@/api/notification/queries/notificationUnreadCount.query'

const i18n = useI18n()
const notificationUnreadCountQuery = useNotificationUnreadCountQuery()

const unreadNotificationCount = computed<number>(() => notificationUnreadCountQuery.data.value?.amount ?? 0)
</script>

<template>
  <VcKeyboardShortcutProvider :keyboard-keys="['g', 'n']">
    <div class="relative">
      <VcIconButton
        :label="i18n.t('module.notification.notification_center.trigger.label')"
        :class-config="{
          root: 'text-primary-on-brand/80 data-[loading=false]:not-disabled:hover:bg-primary/10 rounded-full',
        }"
        variant="tertiary"
        icon="notification"
      />

      <AnimatePresence>
        <Motion
          v-if="unreadNotificationCount > 0"
          :initial="{ opacity: 0, scale: 0 }"
          :animate="{ opacity: 1, scale: 1 }"
          :exit="{ opacity: 0, scale: 0 }"
          class="pointer-events-none absolute top-0 right-0"
        >
          <VcBadge
            :class-config="{
              root: '!leading-none !py-0 h-5 min-w-5 flex items-center justify-center !px-xs',
            }"
            color="error"
            variant="solid"
            size="sm"
          >
            <NumberFlow
              :value="unreadNotificationCount"
              :spin-timing="{
                duration: 300,
                easing: 'ease-in-out',
              }"
            />
          </VcBadge>
        </Motion>
      </AnimatePresence>
    </div>
  </VcKeyboardShortcutProvider>
</template>
