vue
<script setup lang="ts">
import type { Icon } from '@wisemen/vue-core-components'
import {
  VcIconButton,
  VcTableCell,
  VcTableInteractiveElement,
} from '@wisemen/vue-core-components'

const props = defineProps<{
  icon: Icon
  label: string
  size: 'lg' | 'md' | 'sm'
}>()

const emit = defineEmits<{
  click: []
}>()

function onClick(): void {
  emit('click')
}
</script>

<template>
  <VcTableCell class="justify-end">
    <VcTableInteractiveElement>
      <VcIconButton
        :icon="props.icon"
        :label="props.label"
        :size="props.size"
        variant="tertiary"
        @click="onClick"
      />
    </VcTableInteractiveElement>
  </VcTableCell>
</template>
