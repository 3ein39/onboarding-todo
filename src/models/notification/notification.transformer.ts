import { NotificationType } from '@/client'
import { CalendarDateTimeTransformer } from '@/models/date/calendarDateTime.transformer.ts'
import type { CalendarDateTimeDto } from '@/models/date/calendarDateTimeDto.model.ts'
import type { NotificationIndex } from '@/models/notification/notificationIndex.model.ts'
import type { NotificationIndexDto } from '@/models/notification/notificationIndexDto.model.ts'
import type { NotificationIndexPagination } from '@/models/notification/notificationIndexPagination.model.ts'
import type { NotificationIndexPaginationDto } from '@/models/notification/notificationIndexPaginationDto.model.ts'
import type { NotificationUuid } from '@/models/notification/notificationUuid.model.ts'

export class NotificationIndexTransformer {
  static fromDto(dto: NotificationIndexDto): NotificationIndex {
    const createdAt = CalendarDateTimeTransformer.fromDto(dto.createdAt as CalendarDateTimeDto)
    const readAt = CalendarDateTimeTransformer.fromNullableDto(dto.readAt as CalendarDateTimeDto | null)
    const notificationUuid = dto.notificationUuid as NotificationUuid

    if (dto.type === NotificationType.TEST_NOTIFICATION) {
      return {
        notificationUuid,
        createdAt,
        readAt,
        createdByName: dto.createdByUser?.name ?? null,
        icon: 'bell',
        message: dto.message,
        type: NotificationType.TEST_NOTIFICATION,
        meta: dto.meta,
      }
    }

    throw new Error(`Unknown notification: ${dto}`)
  }
}

export class NotificationIndexPaginationTransformer {
  static toDto(pagination: NotificationIndexPagination): NotificationIndexPaginationDto {
    return {
      filter: {
        onlyUnread: pagination?.filter?.onlyUnread !== undefined ? `${pagination?.filter?.onlyUnread}` : undefined,
      },
      sort: pagination?.sort,
    }
  }
}
