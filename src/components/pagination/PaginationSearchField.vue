<script setup lang="ts">
import type { Pagination } from '@wisemen/vue-core-components'
import {
  VcIconButton,
  VcKeyboardShortcut,
  VcKeyboardShortcutProvider,
  VcTextField,
} from '@wisemen/vue-core-components'
import type { KeyboardKey } from 'node_modules/@wisemen/vue-core-components/dist/types/keyboard.type'
import {
  computed,
  useId,
  watch,
} from 'vue'
import { useI18n } from 'vue-i18n'

import { useDebounceSearch } from '@/composables/debounce-search/debounceSearch.composable'

const props = withDefaults(defineProps<{
  isLoading: boolean
  pagination: Pagination<any>
  placeholder?: string | null
}>(), {
  placeholder: null,
})

const KEYBOARD_SHORTCUT: KeyboardKey[] = [
  'meta',
  'f',
]

const i18n = useI18n()
const id = useId()

const {
  isDebouncing, search,
} = useDebounceSearch({
  onDebounceSearch: (value) => {
    props.pagination.handleSearchChange(value)
  },
})

const placeholderText = computed<string>(() => (
  props.placeholder ?? i18n.t('component.search_input.placeholder')
))

function onClearSearch(): void {
  search.value = ''
  props.pagination.handleSearchChange('')
}

watch(() => props.pagination.paginationOptions.value.search, (value) => {
  search.value = value ?? ''
}, {
  immediate: true,
})
</script>

<template>
  <div>
    <label
      :for="id"
      class="sr-only"
    >
      {{ placeholderText }}
    </label>

    <VcKeyboardShortcutProvider
      :keyboard-keys="KEYBOARD_SHORTCUT"
      :prevent-default="true"
    >
      <VcTextField
        :id="id"
        v-model="search"
        :is-loading="(isDebouncing || props.isLoading) && search.length > 0"
        :placeholder="placeholderText"
        icon-left="search"
        class="w-64"
      >
        <template #right>
          <VcIconButton
            v-if="search.length > 0 && !props.isLoading && !isDebouncing"
            :class-config="{
              root: 'outline-none not-disabled:focus-visible:bg-quaternary',
            }"
            icon="close"
            label="Clear search"
            size="sm"
            variant="tertiary"
            class="mr-[0.125rem] shrink-0 rounded-sm"
            @click="onClearSearch"
          />

          <VcKeyboardShortcut
            v-else-if="search.length === 0"
            :keyboard-keys="KEYBOARD_SHORTCUT"
            variant="input-field"
            class="mr-md"
          />
        </template>
      </VcTextField>
    </VcKeyboardShortcutProvider>
  </div>
</template>
