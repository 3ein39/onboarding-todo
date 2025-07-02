<script setup lang="ts">
import {
  AnimatePresence,
  LayoutGroup,
  Motion,
} from 'motion-v'

import AppGroup from '@/components/app/group/AppGroup.vue'
import FiltersActiveItem from '@/components/filters/active/FiltersActiveItem.vue'
import { useInjectFiltersContext } from '@/components/filters/filters.context'
import type {
  FilterUnion,
  FilterWithKey,
} from '@/components/filters/filters.type'

const {
  activeFilters,
} = useInjectFiltersContext()
</script>

<template>
  <AppGroup>
    <LayoutGroup>
      <AnimatePresence
        :initial="false"
        mode="popLayout"
      >
        <Motion
          v-for="filter of (activeFilters as unknown as FilterWithKey<FilterUnion>[])"
          :key="filter.key"
          :initial="{ opacity: 0, x: -5, filter: 'blur(2px)' }"
          :animate="{ opacity: 1, x: 0, filter: 'blur(0px)' }"
          :exit="{ opacity: 0, x: -5, filter: 'blur(2px)' }"
          :layout="true"
          :transition="{
            duration: 0.4,
            type: 'spring',
            bounce: 0,
          }"
        >
          <FiltersActiveItem :filter="filter" />
        </Motion>

        <Motion
          v-if="activeFilters.length === 0"
          :initial="{ opacity: 0, x: 10, filter: 'blur(2px)' }"
          :animate="{ opacity: 1, x: 0, filter: 'blur(0px)' }"
          :exit="{ opacity: 0, x: 10, filter: 'blur(2px)' }"
          :transition="{
            duration: 0.4,
            type: 'spring',
            bounce: 0,
          }"
          class="text-sm font-medium text-tertiary"
        >
          No active filters
        </Motion>
      </AnimatePresence>
    </LayoutGroup>
  </AppGroup>
</template>
