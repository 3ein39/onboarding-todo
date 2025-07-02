import type { VueQueryPluginOptions } from '@tanstack/vue-query'
import {
  QueryCache,
  QueryClient,
  VueQueryPlugin,
} from '@tanstack/vue-query'
import type { App } from 'vue'

import { LoggerUtil } from '@/utils/logger.util.ts'

let onErrorCallback: ((error: Error) => void) | null = null

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
  queryCache: new QueryCache({
    onError: (error): void => {
      if (onErrorCallback !== null) {
        onErrorCallback(error)

        return
      }

      LoggerUtil.error(error)
    },
  }),
})

export function setQueryOnErrorCallback(callback: (error: Error) => void): void {
  onErrorCallback = callback
}

const vueQueryPluginOptions: VueQueryPluginOptions = {
  queryClient,
}

export const vueQueryPlugin: {
  install: (app: App) => void
} = {
  install: (app: App): void => {
    app.use(VueQueryPlugin, vueQueryPluginOptions)
  },
}
