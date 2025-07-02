import type { TestNotificationNotification } from '@/client'
import type { UserUuid } from '@/models/user/userUuid.model.ts'

interface NotificationCreated {
  data: TestNotificationNotification
  topic: `user.${UserUuid}.notification.*.created`
}

export type WebSocketSubscriptionTopicData = NotificationCreated

export type WebSocketSubscriptionTopic = WebSocketSubscriptionTopicData['topic']

export type OnMessageParams<T extends WebSocketSubscriptionTopic>
    = Extract<WebSocketSubscriptionTopicData, { topic: T }>['data']
