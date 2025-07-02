<script setup lang="ts">
import { computed } from 'vue'

import AppGroup from '@/components/app/group/AppGroup.vue'
import GridDecorativeBackgroundPattern from '@/components/decorative/GridDecorativeBackgroundPattern.vue'
import type { ApiError } from '@/types/apiError.type'

const props = defineProps<{
  error: ApiError
}>()

const firstError = computed<ApiError['errors'][number] | null>(() => {
  const [
    firstError,
  ] = props.error.errors ?? []

  return firstError ?? null
})
</script>

<template>
  <AppGroup
    v-if="firstError !== null"
    class="relative h-full"
    justify="center"
    align="center"
    direction="col"
  >
    <div
      justify="center"
      align="center"
      direction="col"
      class="z-1"
    >
      <span class="text-5xl font-bold text-secondary">
        {{ firstError.status }}
      </span>

      <p class="mt-md text-lg font-medium text-tertiary">
        {{ firstError.detail }}
      </p>
    </div>

    <GridDecorativeBackgroundPattern
      class="
        absolute size-full max-h-120 max-w-120 text-gray-200
        dark:text-gray-900
      "
    />
  </AppGroup>
</template>
