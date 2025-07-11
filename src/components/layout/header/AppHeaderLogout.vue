<script setup lang="ts">
import { VcIconButton } from '@wisemen/vue-core-components'
import { useI18n } from 'vue-i18n'

import AppButtonTooltip from '@/components/app/tooltip/AppButtonTooltip.vue'
import { TEST_ID } from '@/constants/testId.constant.ts'

const emit = defineEmits<{
  signOut: []
}>()

const i18n = useI18n()

function onSignOut(): void {
  emit('signOut')
}
</script>

<template>
  <AppButtonTooltip
    :label="i18n.t('component.sidebar.footer.sign_out')"
  >
    <VcIconButton
      :test-id="TEST_ID.APP_PAGE.USER_BUTTON"
      :class-config="{
        root: 'text-primary data-[loading=false]:not-disabled:hover:bg-primary/10 rounded-full',
      }"
      :label="i18n.t('component.sidebar.footer.sign_out')"
      icon="logout"
      variant="tertiary"
      @click="onSignOut"
    />
  </AppButtonTooltip>
</template>
