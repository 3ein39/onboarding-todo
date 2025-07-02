<script setup lang="ts">
import type { Icon } from '@wisemen/vue-core-components'
import { VcIcon } from '@wisemen/vue-core-components'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import { NotificationPreset } from '@/client'
import AppUnstyledButton from '@/components/app/button/AppUnstyledButton.vue'

const props = defineProps<{
  preset: NotificationPreset | null
}>()

const emit = defineEmits<{
  select: [value: NotificationPreset]
}>()

interface QuickAction {
  id: NotificationPreset
  title: string
  color: string
  description: string
  icon: Icon
}

const i18n = useI18n()

const actions = computed<QuickAction[]>(() => {
  return [
    {
      id: NotificationPreset.ALL,
      title: i18n.t('module.settings.notifications.all.title'),
      color: 'green',
      description: i18n.t('module.settings.notifications.all.description'),
      icon: 'bellArrow',
    },
    {
      id: NotificationPreset.DEFAULT,
      title: i18n.t('module.settings.notifications.default.title'),
      color: 'yellow',
      description: i18n.t('module.settings.notifications.default.description'),
      icon: 'bell',
    },
    {
      id: NotificationPreset.CUSTOM,
      title: i18n.t('module.settings.notifications.custom.title'),
      color: 'blue',
      description: i18n.t('module.settings.notifications.custom.description'),
      icon: 'settings',
    },
    {
      id: NotificationPreset.NONE,
      title: i18n.t('module.settings.notifications.none.title'),
      color: 'red',
      description: i18n.t('module.settings.notifications.none.description'),
      icon: 'bellSlash',
    },
  ]
})

function onClick(id: NotificationPreset): void {
  emit('select', id)
}

function isSelected(id: NotificationPreset): boolean {
  return props.preset === id
}
</script>

<template>
  <div class="grid grid-cols-4 gap-lg">
    <AppUnstyledButton
      v-for="action in actions"
      :key="action.id"
      :class="{
        'bg-gradient-to-b from-brand-800 to-brand-950': isSelected(action.id),
        'bg-primary': !isSelected(action.id),
      }"
      class="
        flex flex-col gap-sm rounded-lg border border-secondary p-lg text-left
        hover:border-brand
      "
      @click="onClick(action.id)"
    >
      <div
        :class="{
          'bg-brand-200 text-brand-600': action.color === 'blue',
          'bg-success-200 text-success-600': action.color === 'green',
          'bg-warning-200 text-warning-600': action.color === 'yellow',
          'bg-error-200 text-error-600': action.color === 'red',
        }"
        class="flex w-min items-center justify-center rounded-full p-md"
      >
        <VcIcon
          :icon="action.icon"
          class="size-4"
        />
      </div>
      <h3
        :class="{
          'text-primary-on-brand': isSelected(action.id),
          'text-tertiary': !isSelected(action.id),
        }"
        class="text-sm font-semibold"
      >
        {{ action.title }}
      </h3>
      <p
        :class="{
          'text-primary-on-brand': isSelected(action.id),
          'text-tertiary': !isSelected(action.id),
        }"
        class="text-sm"
      >
        {{ action.description }}
      </p>
    </AppUnstyledButton>
  </div>
</template>
