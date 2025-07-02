<script setup lang="ts">
import { VcIcon } from '@wisemen/vue-core-components'
import { ListboxItem } from 'reka-ui'

import AppGroup from '@/components/app/group/AppGroup.vue'
import { useInjectCommandMenuContext } from '@/components/command-menu/commandMenu.context'
import type { CommandMenuResult } from '@/components/command-menu/commandMenu.type'
import CommandMenuResultHighlight from '@/components/command-menu/CommandMenuResultHighlight.vue'

const props = defineProps<{
  result: CommandMenuResult
}>()

const {
  onSelectResult,
} = useInjectCommandMenuContext()
</script>

<template>
  <ListboxItem
    :value="props.result.id"
    :as-child="true"
    @select="onSelectResult(props.result)"
  >
    <div
      class="
        group/command-menu-result relative block cursor-default rounded-md px-xl
        py-lg outline-none
      "
    >
      <CommandMenuResultHighlight :result="props.result" />

      <AppGroup gap="lg">
        <VcIcon
          :icon="props.result.icon"
          class="size-4 text-tertiary"
        />

        <AppGroup v-if="props.result.breadcrumbs.length > 0">
          <template
            v-for="breadcrumb of props.result.breadcrumbs"
            :key="breadcrumb"
          >
            <span class="text-sm text-tertiary">
              {{ breadcrumb }}
            </span>

            <VcIcon
              icon="chevronRight"
              class="size-3 text-tertiary"
            />
          </template>
        </AppGroup>

        <span class="text-sm text-primary">
          {{ props.result.label }}
        </span>
      </AppGroup>
    </div>
  </ListboxItem>
</template>
