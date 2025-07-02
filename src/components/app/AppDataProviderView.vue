<script setup lang="ts" generic="TQueries">
import type {
  useQuery,
  UseQueryReturnType,
} from '@wisemen/vue-core-query'
import { computed } from 'vue'

import AppErrorState from '@/components/app/error-state/AppErrorState.vue'
import type { ApiError } from '@/types/apiError.type'
import { ApiErrorUtil } from '@/utils/apiError.util'

const props = defineProps<{
  queries: {
    [KQuery in keyof TQueries]: UseQueryReturnType<TQueries[KQuery]>
  }
}>()

const isLoading = computed<boolean>(() => {
  for (const key in props.queries) {
    if (props.queries[key].isLoading.value as boolean) {
      return true
    }
  }

  return false
})

const error = computed<ApiError | null>(() => {
  const error = Object.values(props.queries)
    .map((query) => (query as ReturnType<typeof useQuery>).error.value)
    .find((error) => ApiErrorUtil.isError(error))

  const nonApiError = Object.values(props.queries)
    .map((query) => (query as ReturnType<typeof useQuery>).error.value)
    .find((error) => !ApiErrorUtil.isError(error)) ?? null

  if (nonApiError !== null) {
    throw nonApiError
  }

  return error ?? null
})

const data = computed<{
  [KQuery in keyof TQueries]: TQueries[KQuery]
}>(() => {
  const data = {} as any

  for (const key in props.queries) {
    data[key] = props.queries[key].data.value
  }

  return data
})
</script>

<template>
  <!-- TODO: page skeleton -->
  <div v-if="isLoading" />

  <AppErrorState
    v-else-if="error !== null"
    :error="error"
  />

  <template v-else>
    <slot :data="data" />
  </template>
</template>
