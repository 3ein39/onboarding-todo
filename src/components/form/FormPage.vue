<script setup lang="ts">
import AppPage from '@/components/layout/AppPage.vue'

const props = defineProps<{
  title: string
}>()
</script>

<template>
  <AppPage
    :title="props.title"
    class="pb-6xl"
  >
    <template #actions>
      <slot name="header-actions" />
    </template>

    <slot />
  </AppPage>
</template>
