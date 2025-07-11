<script setup lang="ts">
import AppGroup from '@/components/app/group/AppGroup.vue'
import CommandMenuTrigger from '@/components/command-menu/CommandMenuTrigger.vue'
import AppHeaderLogout from '@/components/layout/header/AppHeaderLogout.vue'
import AppHeaderSettings from '@/components/layout/header/AppHeaderSettings.vue'

const emit = defineEmits<{
  signOut: []
}>()

function onSignOut(): void {
  emit('signOut')
}
</script>

<template>
  <div
    class="flex items-center justify-between p-md"
  >
    <div class="flex-1" />

    <div class="flex justify-center">
      <CommandMenuTrigger />
    </div>

    <div class="flex flex-1 justify-end">
      <AppGroup
        justify="end"
      >
        <AppHeaderSettings />
        <AppHeaderLogout @sign-out="onSignOut" />
      </AppGroup>
    </div>
  </div>
</template>
