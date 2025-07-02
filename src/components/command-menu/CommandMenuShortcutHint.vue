<script setup lang="ts">
import { VcKeyboardKey } from '@wisemen/vue-core-components'
import type { KeyboardKey } from 'node_modules/@wisemen/vue-core-components/dist/types/keyboard.type'

import AppGroup from '@/components/app/group/AppGroup.vue'

const props = defineProps<{
  keyboardKeys: KeyboardKey[]
  label: string
}>()
</script>

<template>
  <div class="px-xl py-lg">
    <AppGroup>
      <AppGroup gap="xs">
        <VcKeyboardKey
          v-for="keyboardKey of props.keyboardKeys"
          :key="keyboardKey"
          :keyboard-key="keyboardKey"
          :class-config="{
            key: '!bg-secondary/75',
          }"
        />
      </AppGroup>

      <span class="text-xs font-medium text-secondary">
        {{ props.label }}
      </span>
    </AppGroup>
  </div>
</template>
