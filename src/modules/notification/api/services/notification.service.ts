import type {
  PaginatedData,
  PaginationOptions,
} from '@wisemen/vue-core-components'
import { PaginationParamsBuilder } from '@wisemen/vue-core-components'

import {
  getMyNotificationsV1,
  markAllNotificationAsReadV1,
  markNotificationAsReadV1,
  viewUnreadNotificationsCountV1,
} from '@/client'
import {
  NotificationIndexPaginationTransformer,
  NotificationIndexTransformer,
} from '@/models/notification/notification.transformer.ts'
import type { NotificationIndex } from '@/models/notification/notificationIndex.model.ts'
import type { NotificationIndexDto } from '@/models/notification/notificationIndexDto.model.ts'
import type { NotificationIndexPagination } from '@/models/notification/notificationIndexPagination.model.ts'
import type { NotificationUuid } from '@/models/notification/notificationUuid.model.ts'
import type { NotificationUnreadCount } from '@/models/notification/unread-count/notificationUnreadCount.model.ts'
import { NotificationUnreadCountTransformer } from '@/models/notification/unread-count/notificationUnreadCount.transformer.ts'

export class NotificationService {
  static async getAll(paginationOptions: PaginationOptions<NotificationIndexPagination>):
  Promise<PaginatedData<NotificationIndex>> {
    const query = new PaginationParamsBuilder<NotificationIndexPagination>(paginationOptions)
      .buildKeyset(NotificationIndexPaginationTransformer.toDto)

    const response = await getMyNotificationsV1({
      query,
      responseValidator: undefined,
    })

    return {
      data: response.data.items.map((value) => NotificationIndexTransformer.fromDto(value as NotificationIndexDto)),
      meta: {
        next: response.data.meta.next,
        total: response.data.items.length,
      },
    }
  }

  static async getUnreadCount(): Promise<NotificationUnreadCount> {
    const response = await viewUnreadNotificationsCountV1()

    return NotificationUnreadCountTransformer.fromDto(response.data)
  }

  static async markAllAsRead(): Promise<void> {
    await markAllNotificationAsReadV1()
  }

  static async markAsRead(uuid: NotificationUuid): Promise<void> {
    await markNotificationAsReadV1({
      path: {
        notificationUuid: uuid,
      },
    })
  }
}
