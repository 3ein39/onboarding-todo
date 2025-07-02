<script setup lang="ts">
import { useElementSize } from '@vueuse/core'
import { Motion } from 'motion-v'
import {
  onMounted,
  ref,
} from 'vue'

const props = defineProps<{
  durationInMs: number
}>()

const contentRef = ref<HTMLDivElement | null>(null)
const isAnimationEnabled = ref<boolean>(false)
const {
  height, width,
} = useElementSize(contentRef)

onMounted(() => {
  // TODO: fix this
  setTimeout(() => {
    isAnimationEnabled.value = true
  }, 50)
})
</script>

<template>
  <Motion
    :animate="{
      width,
      height,
    }"
    :transition="isAnimationEnabled ? {
      duration: props.durationInMs / 1000,
      type: 'spring',
      bounce: 0,
    } : { duration: 0 }"
    class="flex items-center justify-center"
  >
    <div
      ref="contentRef"
      class="h-fit w-fit"
    >
      <slot />
    </div>
  </Motion>
</template>
