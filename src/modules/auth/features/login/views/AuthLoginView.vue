<script setup lang="ts">
import {
  useVcToast,
  VcButton,
} from '@wisemen/vue-core-components'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

import { TEST_ID } from '@/constants/testId.constant.ts'
import AuthLoginElementTransition from '@/modules/auth/features/login/components/AuthLoginElementTransition.vue'
import { useAuthStore } from '@/stores/auth.store'

const authStore = useAuthStore()

const isSigningIn = ref<boolean>(false)

const i18n = useI18n()
const toast = useVcToast()

async function onSignInWithZitadel(): Promise<void> {
  isSigningIn.value = true

  const loginUrlResponse = await authStore.getLoginUrl()

  loginUrlResponse.match(
    (loginUrl) => {
      window.location.replace(loginUrl)
    },
    (error) => {
      isSigningIn.value = false

      toast.error({
        title: i18n.t('toast.error.general_title'),
        description: error.message,
      })
    },
  )
}
</script>

<template>
  <div
    class="
      grid h-dvh grid-cols-1 bg-primary
      md:grid-cols-2
    "
  >
    <div class="relative flex flex-col justify-center px-3xl py-8xl">
      <div class="z-10 mx-auto w-full max-w-80">
        <div>
          <AuthLoginElementTransition delay-class="delay-0">
            <!-- Not sure why, but wihtout duration-100 the transition is bugged -->
            <h1 class="text-center text-4xl font-bold text-primary duration-100">
              {{ i18n.t('module.auth.login.title') }}
            </h1>
          </AuthLoginElementTransition>

          <AuthLoginElementTransition delay-class="delay-150">
            <!-- Not sure why, but wihtout duration-100 the transition is bugged -->
            <p class="relative mt-md text-center text-secondary duration-100">
              {{ i18n.t('module.auth.login.description') }}
            </p>
          </AuthLoginElementTransition>

          <div class="mt-4xl flex flex-col gap-y-md">
            <AuthLoginElementTransition delay-class="delay-300">
              <VcButton
                :is-loading="isSigningIn"
                :test-id="TEST_ID.AUTH.LOGIN.SUBMIT_BUTTON"
                class="w-full"
                variant="secondary"
                @click="onSignInWithZitadel"
              >
                {{ i18n.t('module.auth.login.sign_in') }}
              </VcButton>
            </AuthLoginElementTransition>
          </div>
        </div>
      </div>
    </div>

    <div class="h-full bg-secondary" />
  </div>
</template>
