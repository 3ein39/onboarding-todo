<script lang="ts" setup>
import { useRouteQuery } from '@vueuse/router'
import { useVcToast } from '@wisemen/vue-core-components'
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

import { TEST_ID } from '@/constants/testId.constant.ts'
import { oAuthClient } from '@/libs/oAuth.lib.ts'
import { useAuthStore } from '@/stores/auth.store.ts'

const i18n = useI18n()
const router = useRouter()
const authStore = useAuthStore()
const toast = useVcToast()
const authorizationCode = useRouteQuery<string | null>('code', null)

onMounted(async () => {
  const isLoggedIn = await oAuthClient.isLoggedIn()

  if (isLoggedIn) {
    await router.push({
      name: 'index',
    })

    return
  }

  if (authorizationCode.value === null) {
    toast.error({
      title: i18n.t('toast.error.general_title'),
      description: i18n.t('module.auth.login.error'),
    })

    await router.push({
      name: 'auth-logout',
    })

    return
  }

  const loginWithCodeResponse = await authStore.loginWithCode(authorizationCode.value)

  if (loginWithCodeResponse.isErr()) {
    toast.error({
      title: i18n.t('toast.error.general_title'),
      description: loginWithCodeResponse.error?.toString() ?? 'Unknown error',
    })

    await router.push({
      name: 'auth-logout',
    })

    return
  }

  await router.push({
    name: 'index',
  })
})
</script>

<template>
  <div
    :data-test-id="TEST_ID.AUTH.CALLBACK"
    class="h-dvh bg-primary"
  />
</template>
