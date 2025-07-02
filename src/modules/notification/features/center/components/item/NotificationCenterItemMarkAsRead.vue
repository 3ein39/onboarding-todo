<script setup lang="ts">
import { VcButton } from '@wisemen/vue-core-components'
import {
  AnimatePresence,
  Motion,
  MotionConfig,
} from 'motion-v'
import { useI18n } from 'vue-i18n'

import { useInjectNotificationCenterItemContext } from '@/modules/notification/features/center/components/item/notificationCenterItem.context'

const {
  markAsRead, notification,
} = useInjectNotificationCenterItemContext()

const i18n = useI18n()
</script>

<template>
  <div class="relative">
    <MotionConfig
      :transition="{
        duration: 0.3,
        type: 'spring',
        bounce: 0,
      }"
    >
      <AnimatePresence>
        <Motion
          v-if="notification.readAt === null"
          :exit="{
            opacity: 0,
            width: 0,
          }"
          class="absolute right-0 overflow-hidden"
        >
          <Motion
            :variants="{
              initial: {
                marginLeft: 0,
              },
              hover: {
                marginLeft: '0.25rem',
              },
            }"
            initial="initial"
            hover="hover"
          >
            <VcButton
              :class-config="{
                root: 'rounded-full text-secondary !px-0 h-auto !min-w-5 text-xs not-disabled:data-[loading=false]:hover:bg-tertiary not-disabled:data-[loading=false]:focus-visible:bg-tertiary outline-none',
              }"
              size="sm"
              variant="tertiary"
              @click="markAsRead"
            >
              <Motion
                :variants="{
                  initial: {
                    opacity: 1,
                    width: 'auto',
                  },
                  hover: {
                    opacity: 0,
                    width: 0,
                  },
                }"
              >
                <div class="px-md">
                  <div class="size-1 rounded-full bg-error-500" />
                </div>
              </Motion>

              <Motion
                :variants="{
                  initial: {
                    opacity: 0,
                    width: 0,
                    marginLeft: '0',
                  },
                  hover: {
                    opacity: 1,
                    width: 'auto',
                  },
                }"
              >
                <div class="px-sm">
                  {{ i18n.t('module.notification.notification_center.mark_as_read.label') }}
                </div>
              </Motion>
            </VcButton>
          </Motion>
        </Motion>
      </AnimatePresence>
    </MotionConfig>
  </div>
</template>
