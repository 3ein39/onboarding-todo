<script setup lang="ts">
import AppErrorState from '@/components/app/error-state/AppErrorState.vue'
import { ApiErrorUtil } from '@/utils/apiError.util'

const props = defineProps<{
  error: unknown
}>()
</script>

<template>
  <div
    v-if="props.error !== null && ApiErrorUtil.isError(props.error)"
    class="flex size-full flex-1 items-center justify-center"
  >
    <AppErrorState :error="props.error" />
  </div>
</template>
