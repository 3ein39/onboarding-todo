<script setup lang="ts">
import AppGroup from '@/components/app/group/AppGroup.vue'
import AppPageContainer from '@/components/layout/AppPageContainer.vue'

const props = defineProps<{
  title: string
}>()
</script>

<template>
  <main
    class="flex size-full flex-col overflow-hidden rounded-tl-4xl bg-primary"
  >
    <AppPageContainer class="py-4xl">
      <AppGroup justify="between">
        <h1 class="text-2xl font-semibold text-primary">
          {{ props.title }}
        </h1>

        <AppGroup id="header-actions">
          <slot name="actions" />
        </AppGroup>
      </AppGroup>
    </AppPageContainer>

    <AppPageContainer class="h-full overflow-auto py-xxs pb-2xl">
      <slot />
    </AppPageContainer>
  </main>
</template>
