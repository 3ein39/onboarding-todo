<script setup lang="ts">
import {
  AnimatePresence,
  Motion,
} from 'motion-v'
import {
  injectListboxRootContext,
  ListboxContent,
  ListboxGroup,
  ListboxGroupLabel,
} from 'reka-ui'
import {
  computed,
  watch,
} from 'vue'
import { useI18n } from 'vue-i18n'

import AppGroup from '@/components/app/group/AppGroup.vue'
import AnimateHeight from '@/components/app/transition/AnimateHeight.vue'
import { useInjectCommandMenuContext } from '@/components/command-menu/commandMenu.context'
import type {
  CommandMenuCategory,
  CommandMenuResult as CommandMenuResultType,
} from '@/components/command-menu/commandMenu.type'
import CommandMenuResult from '@/components/command-menu/CommandMenuResult.vue'

const {
  highlightedResultId,
  results,
  searchTerm,
} = useInjectCommandMenuContext()

const {
  highlightFirstItem,
} = injectListboxRootContext()

const i18n = useI18n()

const categories = computed<CommandMenuCategory[]>(() => {
  return [
    ...new Set(
      results.value.map((result) => {
        return result.category
      }),
    ),
  ]
})

function getResultsOfCategory(category: CommandMenuCategory): CommandMenuResultType[] {
  return results.value.filter((result) => {
    return result.category === category
  })
}

watch(results, (results) => {
  if (results.length > 0) {
    highlightFirstItem(new InputEvent(''))
  }
  else {
    highlightedResultId.value = null
  }
})
</script>

<template>
  <AnimateHeight>
    <AnimatePresence mode="popLayout">
      <Motion
        v-if="results.length > 0 && searchTerm.length > 0"
        :variants="{
          initial: { opacity: 0, y: -12 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -12 },
        }"
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <ListboxContent class="overflow-y-auto px-sm pt-xl pb-md">
          <AnimatePresence mode="popLayout">
            <AppGroup
              direction="col"
              gap="2xl"
              align="start"
            >
              <ListboxGroup
                v-for="category of categories"
                :key="category"
                class="w-full"
              >
                <ListboxGroupLabel class="mb-md px-xl text-sm text-secondary">
                  {{ i18n.t(`enum.search_category_name.${category}`) }}
                </ListboxGroupLabel>

                <CommandMenuResult
                  v-for="result in getResultsOfCategory(category)"
                  :key="result.id"
                  :result="result"
                />
              </ListboxGroup>
            </AppGroup>
          </AnimatePresence>
        </ListboxContent>
      </Motion>
    </AnimatePresence>
  </AnimateHeight>
</template>
