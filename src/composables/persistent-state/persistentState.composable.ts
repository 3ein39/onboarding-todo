import type { ComputedRef } from 'vue'
import {
  computed,
  watch,
} from 'vue'
import {
  useRoute,
  useRouter,
} from 'vue-router'

function base64Encode(value: unknown): string {
  return btoa(encodeURIComponent(JSON.stringify(value)))
}

function base64Decode<T = unknown>(value: string): T {
  try {
    return JSON.parse(decodeURIComponent(atob(value)))
  }
  catch {
    return null as T
  }
}

interface UsePersistentRouteStateOptions {
  key: string
}

interface UsePersistentRouteState<TState> {
  state: ComputedRef<TState | null>
  sync: {
    [K in keyof TState]: ComputedRef<TState[K]>
  }
}

export function usePersistentRouteState<TState>(
  options: UsePersistentRouteStateOptions,
): UsePersistentRouteState<TState> {
  const route = useRoute()
  const router = useRouter()

  function getRawValue(): TState | null {
    const encoded = route.query[options.key as keyof typeof route.query]

    if (typeof encoded === 'string') {
      return base64Decode<TState>(encoded)
    }

    return null
  }

  const state = computed<TState | null>({
    get: () => getRawValue(),
    set: (value: TState | null) => {
      const updatedQuery = {
        ...route.query,
        [options.key]: base64Encode(value),
      }

      router.replace({
        query: updatedQuery,
      })
    },
  })

  function sync(stateToSync: Record<string, ComputedRef<unknown>>): void {
    for (const key in stateToSync) {
      const value = stateToSync[key]

      watch(
        value,
        (val) => {
          const currentState: any = getRawValue() || {}

          currentState[key] = val
          state.value = currentState
        },
        {
          deep: true,
        },
      )
    }
  }

  return {
    state,
    sync: sync as any,
  }
}
