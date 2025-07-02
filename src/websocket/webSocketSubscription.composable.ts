import type { Subscription } from 'nats.ws'
import {
  onBeforeUnmount,
  ref,
} from 'vue'

import { onCreated } from '@/composables/created/created.composable.ts'
import { WebSocketService } from '@/websocket/webSocketService.ts'

import type {
  OnMessageParams,
  WebSocketSubscriptionTopic,
} from './webSocket.type'

export function useWebSocketSubscription<const TTopic extends WebSocketSubscriptionTopic>(
  topic: TTopic,
  onMessage: (message: OnMessageParams<TTopic>) => void,
): void {
  const subscription = ref<Subscription | null>(null)

  onCreated(async () => {
    const websocketService = WebSocketService.getInstance()

    subscription.value = await websocketService.subscribe(topic, onMessage)
  })

  onBeforeUnmount(() => {
    if (subscription.value === null) {
      return
    }

    subscription.value.unsubscribe()
  })
}
