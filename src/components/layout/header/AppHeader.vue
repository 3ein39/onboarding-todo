<script setup lang="ts">
import AppSeparator from '@/components/app/AppSeparator.vue'
import AppGroup from '@/components/app/group/AppGroup.vue'
import CommandMenuTrigger from '@/components/command-menu/CommandMenuTrigger.vue'
import AppHeaderSettings from '@/components/layout/header/AppHeaderSettings.vue'
import AppHeaderUserProfile from '@/components/layout/header/AppHeaderUserProfile.vue'
import type { UserDetail } from '@/models/user/detail/userDetail.model.ts'
import { NotificationCenter } from '@/modules/notification/components.ts'

const props = defineProps<{
  user: UserDetail
}>()

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
      <NotificationCenter />

      <AppSeparator
        class="!h-7 !bg-fg-quaternary"
        direction="vertical"
      />

      <AppHeaderUserProfile
        :user="props.user"
        @sign-out="onSignOut"
      />
    </AppGroup>
  </div>
</template>
