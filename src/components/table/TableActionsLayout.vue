<script setup lang="ts">
import AppGroup from '@/components/app/group/AppGroup.vue'
</script>

<template>
  <AppGroup
    justify="between"
    class="mb-lg"
  >
    <slot name="left">
      <div />
    </slot>

    <slot name="right" />
  </AppGroup>
</template>
