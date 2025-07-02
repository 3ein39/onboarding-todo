import type { Address } from '@wisemen/vue-core-components'

import type { ContactUuid } from '@/models/contact/contactUuid.model'

export interface ContactIndex {
  uuid: ContactUuid
  isActive: boolean
  name: string | null
  address: Address | null
  email: string | null
  phone: string | null
}
