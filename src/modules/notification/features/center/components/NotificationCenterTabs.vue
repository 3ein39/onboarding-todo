<script setup lang="ts">
import NumberFlow from '@number-flow/vue'
import {
  VcBadge,
  VcTabs,
  VcTabsContent,
  VcTabsItem,
} from '@wisemen/vue-core-components'
import {
  AnimatePresence,
  Motion,
} from 'motion-v'
import { useI18n } from 'vue-i18n'

import { useInjectNotificationCenterContext } from '@/modules/notification/features/center/components/notificationCenter.context'
import { NotificationCenterTab } from '@/modules/notification/features/center/types/notificationCenter.type'

const {
  activeTab, unreadCount,
} = useInjectNotificationCenterContext()

const i18n = useI18n()
</script>

<template>
  <VcTabs
    v-model="activeTab"
    :class-config="{
      base: 'px-xl pt-md',
      item: 'outline-none focus-visible:bg-brand-solid not-disabled:focus-visible:text-primary-on-brand',
    }"
  >
    <template #items>
      <VcTabsItem :value="NotificationCenterTab.UNREAD">
        {{ i18n.t('module.notification.notification_center.unread') }}

        <VcBadge
          :class-config="{
            root: 'rounded-sm !px-sm !py-0 !bg-gray-300 !border-gray-300 !text-primary dark:!bg-gray-700 dark:!border-gray-700 dark:!text-primary-on-brand',
          }"
          color="gray"
          variant="solid"
          size="sm"
          class="ml-sm"
        >
          <NumberFlow
            :value="unreadCount"
            :spin-timing="{
              duration: 300,
              easing: 'ease-in-out',
            }"
          />
        </VcBadge>
      </VcTabsItem>

      <VcTabsItem :value="NotificationCenterTab.ALL">
        {{ i18n.t('module.notification.notification_center.all') }}
      </VcTabsItem>
    </template>

    <template #content>
      <AnimatePresence
        :initial="false"
        mode="popLayout"
      >
        <Motion
          v-if="activeTab === NotificationCenterTab.UNREAD"
          :as-child="true"
          :initial="{
            x: '-100%',
            filter: 'blur(4px)',
            opacity: 0,
          }"
          :animate="{
            x: 0,
            filter: 'blur(0)',
            opacity: 1,
          }"
          :exit="{
            x: '-100%',
            filter: 'blur(4px)',
            opacity: 0,
          }"
          :transition="{
            bounce: 0,
            duration: 0.3,
            type: 'spring',
          }"
        >
          <VcTabsContent value="unread">
            <slot name="unread" />
          </VcTabsContent>
        </Motion>

        <Motion
          v-if="activeTab === NotificationCenterTab.ALL"
          :as-child="true"
          :initial="{
            x: '100%',
            filter: 'blur(4px)',
            opacity: 0,
          }"
          :animate="{
            x: 0,
            filter: 'blur(0)',
            opacity: 1,
          }"
          :exit="{
            x: '100%',
            filter: 'blur(4px)',
            opacity: 0,
          }"
          :transition="{
            bounce: 0,
            duration: 0.3,
            type: 'spring',
          }"
        >
          <VcTabsContent value="all">
            <slot name="all" />
          </VcTabsContent>
        </Motion>
      </AnimatePresence>
    </template>
  </VcTabs>
</template>
