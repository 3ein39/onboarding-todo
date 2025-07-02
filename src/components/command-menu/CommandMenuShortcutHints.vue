<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import AppGroup from '@/components/app/group/AppGroup.vue'
import { useInjectCommandMenuContext } from '@/components/command-menu/commandMenu.context'
import CommandMenuShortcutHint from '@/components/command-menu/CommandMenuShortcutHint.vue'

const {
  results,
} = useInjectCommandMenuContext()

const i18n = useI18n()
</script>

<template>
  <AppGroup
    :class="{
      'border-t-primary': results.length > 0,
      'border-t-transparent': results.length === 0,
    }"
    justify="between"
    class="border-t border-solid"
  >
    <AppGroup gap="none">
      <CommandMenuShortcutHint
        :keyboard-keys="['arrowdown', 'arrowup']"
        :label="i18n.t('shared.navigate')"
      />

      <CommandMenuShortcutHint
        :keyboard-keys="['enter']"
        :label="i18n.t('shared.select')"
      />
    </AppGroup>

    <CommandMenuShortcutHint
      :keyboard-keys="['escape']"
      :label="i18n.t('shared.close')"
    />
  </AppGroup>
</template>
