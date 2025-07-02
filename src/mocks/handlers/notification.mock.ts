import {
  http,
  HttpResponse,
} from 'msw'

import { NotificationUnreadCountDtoBuilder } from '@/models/notification/unread-count/notificationUnreadCountDto.builder.ts'

export const notificationHandlers = [
  http.get('*/api/v1/me/notifications/unread-count', () => {
    const data = new NotificationUnreadCountDtoBuilder().build()

    return HttpResponse.json(data)
  }),

  http.get('*/api/v1/me/notifications*', () => {
    return HttpResponse.json({
      items: [],
      meta: {
        next: null,
      },
    })
  }),
]
