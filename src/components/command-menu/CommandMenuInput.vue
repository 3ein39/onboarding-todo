<script setup lang="ts">
import {
  VcIcon,
  VcTextField,
} from '@wisemen/vue-core-components'
import {
  AnimatePresence,
  Motion,
} from 'motion-v'
import { ListboxFilter } from 'reka-ui'
import { useI18n } from 'vue-i18n'

import { useInjectCommandMenuContext } from '@/components/command-menu/commandMenu.context'

const {
  results, searchTerm,
} = useInjectCommandMenuContext()

const i18n = useI18n()
</script>

<template>
  <div class="relative border-b border-primary duration-300">
    <ListboxFilter :as-child="true">
      <VcTextField
        v-model="searchTerm"
        :class-config="{
          root: 'border-none h-auto bg-transparent rounded-none shadow-none outline-none',
          input: 'text-md py-2xl pl-md',
        }"
      >
        <template #left>
          <Motion layout-id="icon-left">
            <VcIcon
              icon="search"
              class="ml-xl size-5 text-tertiary"
            />
          </Motion>
        </template>
      </VcTextField>
    </ListboxFilter>

    <Motion
      v-if="searchTerm.length === 0"
      id="command-menu-placeholder"
      layout-id="placeholder"
      class="
        pointer-events-none absolute top-1/2 left-11 -translate-y-1/2
        text-placeholder
      "
    >
      {{ i18n.t('component.command_menu.placeholder') }}
    </Motion>

    <AnimatePresence>
      <Motion
        v-if="results.length > 0 && searchTerm.length > 0"
        :aria-hidden="true"
        :initial="{ opacity: 0 }"
        :animate="{ opacity: 1 }"
        :exit="{ opacity: 0, transition: { duration: 0 } }"
        class="
          pointer-events-none absolute top-1/2 left-11 -translate-y-1/2
          text-tertiary
        "
      >
        <span class="invisible">{{ searchTerm }}</span>
        <span class="mx-sm">—</span>
        <span>{{ i18n.t('shared.results', { count: results.length }) }}</span>
      </Motion>
    </AnimatePresence>
  </div>
</template>
