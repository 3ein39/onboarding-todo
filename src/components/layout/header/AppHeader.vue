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
    class="grid grid-cols-3 p-md"
  >
    <div id="header-left" />

    <div class="flex w-full justify-center">
      <CommandMenuTrigger />
    </div>

    <AppGroup
      justify="end"
    >
      <AppHeaderSettings />
      <AppHeaderLogout @sign-out="onSignOut" />
    </AppGroup>
  </div>
</template>
