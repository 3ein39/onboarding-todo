<script setup lang="ts">
import { useInfiniteScroll } from '@vueuse/core'
import { ref } from 'vue'

const props = withDefaults(defineProps<{
  distance?: number
  onNext: () => Promise<void>
}>(), {
  distance: 250,
})

const infiniteScrollElementRef = ref<HTMLElement | null>(null)

useInfiniteScroll(
  infiniteScrollElementRef,
  async () => {
    await props.onNext()
  },
  {
    distance: props.distance,
  },
)
</script>

<template>
  <div
    ref="infiniteScrollElementRef"
    class="overflow-auto"
  >
    <slot />
  </div>
</template>
