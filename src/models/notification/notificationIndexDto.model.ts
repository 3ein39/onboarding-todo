import type { GetMyNotificationsResponse } from '@/client'

export type NotificationIndexDto = GetMyNotificationsResponse['items'][number]
