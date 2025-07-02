<script setup lang="ts">
import {
  VcDropdownMenu,
  VcDropdownMenuGroup,
  VcDropdownMenuItem,
  VcDropdownMenuSubMenu,
  VcIconButton,
} from '@wisemen/vue-core-components'

import { useFiltersDateDialog } from '@/components/filters/dialogs/filtersDateDialog.composable'
import { useInjectFiltersContext } from '@/components/filters/filters.context'
import type {
  FilterUnion,
  FilterWithKey,
} from '@/components/filters/filters.type'
import FiltersMenuItemAutocomplete from '@/components/filters/menu/item-types/FiltersMenuItemAutocomplete.vue'
import FiltersMenuItemMultiAutocomplete from '@/components/filters/menu/item-types/FiltersMenuItemMultiAutocomplete.vue'
import FiltersMenuItemMultiSelect from '@/components/filters/menu/item-types/FiltersMenuItemMultiSelect.vue'
import FiltersMenuItemSelect from '@/components/filters/menu/item-types/FiltersMenuItemSelect.vue'

const {
  filters,
} = useInjectFiltersContext()

const filterDateDialog = useFiltersDateDialog()
</script>

<template>
  <VcDropdownMenu
    :is-popover-arrow-hidden="true"
    popover-align="end"
  >
    <template #trigger>
      <VcIconButton
        icon="filterLines"
        label="Filters"
        variant="secondary"
      />
    </template>

    <template #content>
      <VcDropdownMenuGroup class="w-52">
        <template
          v-for="filter of (filters as unknown as FilterWithKey<FilterUnion>[])"
          :key="filter.key"
        >
          <VcDropdownMenuSubMenu
            v-if="filter.type === 'select'"
            :label="filter.label"
          >
            <FiltersMenuItemSelect :filter="filter" />
          </VcDropdownMenuSubMenu>

          <VcDropdownMenuSubMenu
            v-if="filter.type === 'multi-select'"
            :label="filter.label"
          >
            <FiltersMenuItemMultiSelect :filter="filter" />
          </VcDropdownMenuSubMenu>

          <VcDropdownMenuSubMenu
            v-if="filter.type === 'autocomplete'"
            :label="filter.label"
          >
            <FiltersMenuItemAutocomplete :filter="filter" />
          </VcDropdownMenuSubMenu>

          <VcDropdownMenuSubMenu
            v-if="filter.type === 'multi-autocomplete'"
            :label="filter.label"
          >
            <FiltersMenuItemMultiAutocomplete :filter="filter" />
          </VcDropdownMenuSubMenu>

          <VcDropdownMenuItem
            v-if="filter.type === 'date'"
            :filter="filter"
            :label="filter.label"
            @select="filterDateDialog.open(filter)"
          />
        </template>
      </VcDropdownMenuGroup>
    </template>
  </VcDropdownMenu>
</template>
