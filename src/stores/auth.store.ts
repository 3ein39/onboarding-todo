import type { Result } from 'neverthrow'
import {
  err,
  ResultAsync,
} from 'neverthrow'
import { ok } from 'neverthrow'
import { defineStore } from 'pinia'
import {
  computed,
  ref,
} from 'vue'

import { AuthService } from '@/api/auth/services/auth.service'
import { Permission } from '@/client'
import { oAuthClient } from '@/libs/oAuth.lib.ts'
import type { UserDetail } from '@/models/user/detail/userDetail.model.ts'

export const useAuthStore = defineStore('auth', () => {
  const authUser = ref<UserDetail | null>(null)

  const isAuthenticated = computed<boolean>(() => authUser.value === null)

  const logoutCallback = ref<(() => void) | null>(null)

  async function getAuthUser(): Promise<Result<UserDetail, Error>> {
    if (authUser.value !== null) {
      return ok(authUser.value)
    }

    const userResponse = await AuthService.getMe()

    if (userResponse.isErr()) {
      return userResponse
    }

    setAuthUser(userResponse.value)

    return ok(userResponse.value)
  }

  function setAuthUser(user: UserDetail | null): void {
    authUser.value = user
  }

  function hasPermission(permission: Permission): boolean {
    if (authUser.value === null) {
      return false
    }

    if (authUser.value.permissions.includes(Permission.ALL_PERMISSIONS)) {
      return true
    }

    return authUser.value.permissions.includes(permission)
  }

  function logout(): void {
    oAuthClient.logout()
    setAuthUser(null)

    if (logoutCallback.value === null) {
      return
    }

    logoutCallback.value()
  }

  function onLogout(callback: () => void): void {
    logoutCallback.value = callback
  }

  return {
    hasPermission,
    isAuthenticated,
    isLoggedIn,
    authUser,
    getAuthUser,
    getLoginUrl,
    getLogoutUrl,
    loginWithCode,
    logout,
    onLogout,
  }
})

async function getLoginUrl(): Promise<Result<string, Error>> {
  const loginUrlResponse = await ResultAsync.fromPromise(
    oAuthClient.getLoginUrl(),
    () => new Error('Failed to get login URL'),
  )

  if (loginUrlResponse.isErr()) {
    return err(new Error('Failed to get login URL'))
  }

  return ok(loginUrlResponse.value)
}

function getLogoutUrl(): string {
  return oAuthClient.getLogoutUrl()
}

async function loginWithCode(code: string): Promise<Result<void, Error>> {
  const loginResponse = await ResultAsync.fromPromise(
    oAuthClient.loginWithCode(code),
    () => new Error('Failed to login with code'),
  )

  if (loginResponse.isErr()) {
    return err(new Error('Failed to login with code'))
  }

  return ok()
}

async function isLoggedIn(): Promise<boolean> {
  return await oAuthClient.isLoggedIn()
}
