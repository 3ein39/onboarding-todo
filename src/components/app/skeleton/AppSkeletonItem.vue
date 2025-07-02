<script setup lang="ts">
const props = withDefaults(defineProps<{
  /**
   * The animation delay in milliseconds
   * @default 0
   */
  animationDelayInMs?: number
  /**
   * Whether the skeleton item should shimmer
   * @default false
   */
  shimmer?: boolean
}>(), {
  animationDelayInMs: 0,
  shimmer: false,
})
</script>

<template>
  <div
    :aria-busy="true"
    class="relative overflow-hidden rounded-md bg-secondary-subtle"
    role="status"
    aria-live="polite"
  >
    <div
      v-if="props.shimmer"
      :style="{
        animationDelay: `${props.animationDelayInMs}ms`,
      }"
      class="
        absolute inset-0 -translate-x-full animate-pulse bg-gradient-to-r
        from-transparent via-white/60 to-transparent
        dark:via-black/30
      "
    />
  </div>
</template>
