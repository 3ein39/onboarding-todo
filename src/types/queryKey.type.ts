import type { PaginationOptions } from '@wisemen/vue-core-components'
import type { ComputedRef } from 'vue'

import type { ContactUuid } from '@/models/contact/contactUuid.model'
import type { ContactIndexPagination } from '@/models/contact/index/contactIndexPagination.model'
import type { CalendarDate } from '@/models/date/calendarDate.model.ts'
import type { NotificationIndexPagination } from '@/models/notification/notificationIndexPagination.model.ts'
import type { TodoIndexPagination } from '@/models/todo/index/todoIndexPagination.model'
import type { UserIndexPagination } from '@/models/user/index/userIndexPagination.model.ts'
import type { UserUuid } from '@/models/user/userUuid.model'
import type {
  SettingsEventLogIndexPagination,
  SettingsJobIndexPagination,
} from '@/modules/settings'

interface ProjectQueryKeys {
  contactDetail: {
    contactUuid: ComputedRef<ContactUuid>
  }
  contactIndex: {
    paginationOptions?: ComputedRef<PaginationOptions<ContactIndexPagination>>
  }
  globalSearchIndex: {
    search: ComputedRef<string>
  }
  notificationIndex: {
    paginationOptions?: ComputedRef<PaginationOptions<NotificationIndexPagination>>
  }
  notificationUnreadCount: void
  permissions: void
  preferences: void
  roles: void
  settingNotification: void
  settingNotificationDefaults: void
  settingsEventLogIndex: {
    paginationOptions: ComputedRef<PaginationOptions<SettingsEventLogIndexPagination>>
  }
  settingsJobsIndex: {
    paginationOptions: ComputedRef<PaginationOptions<SettingsJobIndexPagination>>
  }
  shiftCount: {
    date: ComputedRef<CalendarDate>
  }
  todoIndex: {
    paginationOptions?: ComputedRef<PaginationOptions<TodoIndexPagination>>
  }
  userDetail: {
    userUuid: ComputedRef<UserUuid>
  }
  userIndex: {
    paginationOptions?: ComputedRef<PaginationOptions<UserIndexPagination>>
  }
}

declare module '@wisemen/vue-core-query' {
  interface QueryKeys extends ProjectQueryKeys {}
}
