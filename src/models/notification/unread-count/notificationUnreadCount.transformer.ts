import type { NotificationUnreadCount } from '@/models/notification/unread-count/notificationUnreadCount.model.ts'
import type { NotificationUnreadCountDto } from '@/models/notification/unread-count/notificationUnreadCountDto.model.ts'

export class NotificationUnreadCountTransformer {
  static fromDto(dto: NotificationUnreadCountDto): NotificationUnreadCount {
    return {
      amount: dto.amount,
      exceedsLimit: dto.exceedsLimit,
    }
  }
}
