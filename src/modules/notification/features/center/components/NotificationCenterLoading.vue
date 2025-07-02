<script setup lang="ts">
import AppGroup from '@/components/app/group/AppGroup.vue'
import NotificationCenterItemSkeleton from '@/modules/notification/features/center/components/NotificationCenterItemSkeleton.vue'
</script>

<template>
  <AppGroup
    direction="col"
    gap="2xl"
    class="p-xl"
  >
    <NotificationCenterItemSkeleton
      v-for="i in 4"
      :key="i"
      :shimmer="true"
    />
  </AppGroup>
</template>
