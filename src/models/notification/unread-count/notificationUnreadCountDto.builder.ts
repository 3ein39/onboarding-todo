import type { NotificationUnreadCountDto } from '@/models/notification/unread-count/notificationUnreadCountDto.model.ts'

export class NotificationUnreadCountDtoBuilder {
  private readonly dto: NotificationUnreadCountDto

  constructor() {
    this.dto = {
      amount: 0,
      exceedsLimit: false,
    }
  }

  public build(): NotificationUnreadCountDto {
    return this.dto
  }

  public withAmount(amount: number): NotificationUnreadCountDtoBuilder {
    this.dto.amount = amount

    return this
  }

  public withExceedsLimit(exceedsLimit: boolean): NotificationUnreadCountDtoBuilder {
    this.dto.exceedsLimit = exceedsLimit

    return this
  }
}
