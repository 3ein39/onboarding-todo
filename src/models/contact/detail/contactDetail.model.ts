import type {
  Address,
  FileInfo,
} from '@wisemen/vue-core-components'

import type { ContactUuid } from '@/models/contact/contactUuid.model'
import type { CalendarDate } from '@/models/date/calendarDate.model.ts'

export interface ContactDetail {
  uuid: ContactUuid
  birthDate: CalendarDate | null
  createdAt: string
  updatedAt: string
  isActive: boolean
  address: Address | null
  email: string | null
  file: FileInfo | null
  firstName: string | null
  lastName: string | null
  phone: string | null
}
