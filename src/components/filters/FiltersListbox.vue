<script setup lang="ts">
import {
  VcCheckboxControl,
  VcCheckboxRoot,
  VcIcon,
  VcSpinner,
} from '@wisemen/vue-core-components'
import {
  AnimatePresence,
  Motion,
} from 'motion-v'
import {
  ListboxContent,
  ListboxFilter,
  ListboxItem,
  ListboxRoot,
  useFilter,
} from 'reka-ui'
import {
  computed,
  ref,
  watch,
} from 'vue'

import AnimateHeight from '@/components/app/transition/AnimateHeight.vue'
import { useInjectFiltersContext } from '@/components/filters/filters.context'
import type {
  AutocompleteFilter,
  FilterValue,
  FilterWithKey,
  MultiAutocompleteFilter,
  MultiSelectFilter,
  SelectFilter,
} from '@/components/filters/filters.type'
import { useFilterValue } from '@/components/filters/filterValue.composable'

const props = defineProps<{
  isAutocomplete: boolean
  filter: FilterWithKey<AutocompleteFilter<FilterValue>
  | MultiAutocompleteFilter<FilterValue>
  | MultiSelectFilter<FilterValue>
  | SelectFilter<FilterValue>>
}>()

const searchTerm = ref<string>('')

const value = useFilterValue<FilterValue | FilterValue[]>(props.filter.key)

const {
  hasInteractedViaKeyboard,
} = useInjectFiltersContext()

const {
  contains,
} = useFilter({
  sensitivity: 'base',
})

function isMultiple(value: unknown): value is FilterValue[] {
  return Array.isArray(value)
}

function isOptionSelected(option: FilterValue): boolean {
  if (isMultiple(value.value)) {
    return value.value.some(
      (value) => JSON.stringify(value) === JSON.stringify(option),
    )
  }

  return JSON.stringify(value.value) === JSON.stringify(option)
}

const filteredOptions = computed<FilterValue[]>(() => {
  const isSearchTermEmpty = searchTerm.value.trim() === ''

  let options: FilterValue[] = []

  if (isSearchTermEmpty || props.isAutocomplete) {
    options = props.filter.options
  }
  else {
    options = props.filter.options.filter((option) =>
      contains(props.filter.displayFn(option), searchTerm.value))
  }

  return options
})

watch(searchTerm, (searchTerm) => {
  if (props.isAutocomplete) {
    (props.filter as AutocompleteFilter<FilterValue>).onSearch?.(searchTerm)
  }
})
</script>

<template>
  <ListboxRoot
    v-model="value"
    :multiple="isMultiple(value)"
  >
    <div class="relative border-b border-secondary">
      <ListboxFilter
        v-model="searchTerm"
        :auto-focus="hasInteractedViaKeyboard"
        placeholder="Filter..."
        class="w-full px-lg py-md text-sm text-primary outline-none"
      />

      <AnimatePresence>
        <Motion
          :initial="{ opacity: 0 }"
          :animate="{ opacity: 1 }"
          :exit="{ opacity: 0 }"
        >
          <VcSpinner
            v-if="false"
            class="
              absolute top-1/2 right-2 size-4 -translate-y-1/2 text-disabled
            "
          />
        </Motion>
      </AnimatePresence>
    </div>

    <div class="p-xs">
      <AnimateHeight>
        <ListboxContent>
          <ListboxItem
            v-for="option in filteredOptions"
            :key="JSON.stringify(option)"
            :value="option"
            class="
              group/listbox-item flex cursor-default items-center gap-x-md
              rounded-sm p-md text-sm
              data-highlighted:bg-secondary-hover
            "
          >
            <div class="flex w-5 shrink-0 items-center justify-center">
              <VcCheckboxRoot
                v-if="isMultiple(value)"
                :model-value="isOptionSelected(option)"
                :aria-hidden="true"
                tabindex="-1"
                class="pointer-events-none"
              >
                <VcCheckboxControl />
              </VcCheckboxRoot>

              <AnimatePresence
                v-else
                :initial="false"
              >
                <Motion
                  v-if="isOptionSelected(option)"
                  :initial="{ opacity: 0, scale: 0.9 }"
                  :animate="{ opacity: 1, scale: 1 }"
                  :exit="{ opacity: 0, scale: 0.9 }"
                  :transition="{
                    duration: 0.2,
                    type: 'spring',
                    bounce: 0,
                  }"
                >
                  <VcIcon
                    icon="check"
                    class="size-4 text-tertiary"
                  />
                </Motion>
              </AnimatePresence>
            </div>

            <span class="truncate text-secondary">
              {{ props.filter.displayFn(option) }}
            </span>
          </ListboxItem>

          <span
            v-if="filteredOptions.length === 0"
            class="block px-md py-sm text-sm text-tertiary"
          >
            No matching options
          </span>
        </ListboxContent>
      </AnimateHeight>
    </div>
  </ListboxRoot>
</template>
