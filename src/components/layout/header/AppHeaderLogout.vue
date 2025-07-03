<script setup lang="ts">
import {
  VcButton,
  VcIcon,
} from '@wisemen/vue-core-components'

import { TEST_ID } from '@/constants/testId.constant.ts'

const emit = defineEmits<{
  signOut: []
}>()

function onSignOut(): void {
  emit('signOut')
}
</script>

<template>
  <VcButton
    :test-id="TEST_ID.APP_PAGE.USER_BUTTON"
    variant="tertiary"
    @click="onSignOut"
  >
    <VcIcon
      icon="logout"
      class="size-5"
      @click="onSignOut"
    />
  </VcButton>
</template>
