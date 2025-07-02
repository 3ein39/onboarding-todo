<script setup lang="ts">
import AppGroup from '@/components/app/group/AppGroup.vue'

const props = defineProps<{
  shimmer: boolean
}>()
</script>

<template>
  <AppGroup
    class="w-full"
    gap="xl"
    align="start"
  >
    <div
      :class="{
        'animate-pulse': props.shimmer,
      }"
      class="size-7 shrink-0 rounded-full bg-tertiary"
    />

    <div class="w-full">
      <div
        :class="{
          'animate-pulse': props.shimmer,
        }"
        class="h-4 w-24 rounded-md bg-tertiary"
      />
      <div
        :class="{
          'animate-pulse': props.shimmer,
        }"
        class="mt-md h-10 w-full rounded-md bg-tertiary"
      />
    </div>
  </AppGroup>
</template>
