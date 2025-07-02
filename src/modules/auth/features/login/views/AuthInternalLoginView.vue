<script setup lang="ts">
import {
  useVcToast,
  VcSpinner,
} from '@wisemen/vue-core-components'
import { ResultAsync } from 'neverthrow'
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

import { oAuthInternalClient } from '@/libs/oAuth.lib.ts'

const i18n = useI18n()
const toast = useVcToast()

async function redirectToLoginUrl(): Promise<void> {
  const loginUrlResponse = await ResultAsync.fromPromise(
    oAuthInternalClient.getLoginUrl(),
    () => new Error('Failed to get login URL'),
  )

  if (loginUrlResponse.isErr()) {
    toast.error({
      title: i18n.t('toast.error.general_title'),
      description: loginUrlResponse.error.message,
    })

    return
  }

  window.location.replace(loginUrlResponse.value)
}

onMounted(() => {
  redirectToLoginUrl()
})
</script>

<template>
  <div
    class="flex h-dvh items-center justify-center bg-brand-primary"
  >
    <VcSpinner class="size-8 text-brand-primary" />
  </div>
</template>
