// eslint-disable-next-line project-structure/independent-modules
import { useRegisterSW } from 'virtual:pwa-register/vue'
import {
  onMounted,
  watch,
} from 'vue'

import { LoggerUtil } from '@/utils/logger.util'
import { TimeUtil } from '@/utils/time.util'

export function useAutoRefresh() {
  const {
    needRefresh, updateServiceWorker,
  } = useRegisterSW({
    immediate: true,
    async onRegisteredSW(swUrl: string, serviceWorkerRegistration: ServiceWorkerRegistration | undefined) {
      LoggerUtil.info('Service Worker at', swUrl)

      if (serviceWorkerRegistration === undefined) {
        LoggerUtil.error('Service Worker not registered')

        return
      }

      await serviceWorkerRegistration.update()

      setInterval(async () => {
        await serviceWorkerRegistration.update()
      }, TimeUtil.minutes(1))

      LoggerUtil.info('SW Registered', serviceWorkerRegistration)
    },
  })

  onMounted(() => {
    watch(needRefresh, (needRefresh) => {
      if (needRefresh) {
        updateServiceWorker(true)
      }
    }, {
      immediate: true,
    })
  })
}
