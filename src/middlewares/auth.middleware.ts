import { useAuthStore } from '@/stores/auth.store.ts'
import { LoggerUtil } from '@/utils/logger.util'
import { MiddlewareUtil } from '@/utils/middleware.util'

export const authMiddleware = MiddlewareUtil.createMiddleware(async () => {
  const authStore = useAuthStore()
  const isLoggedIn = await authStore.isLoggedIn()

  if (!isLoggedIn) {
    return {
      name: 'auth-login',
    }
  }

  const response = await authStore.getAuthUser()

  if (response.isErr()) {
    authStore.logout()

    LoggerUtil.error(response.error)

    return {
      name: 'auth-login',
    }
  }
})
