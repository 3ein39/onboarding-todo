import type { GlobalSearchCollectionName } from '@/client'
import type { ContactUuid } from '@/models/contact/contactUuid.model.ts'
import type { UserUuid } from '@/models/user/userUuid.model.ts'

interface BaseGlobalSearchEntity {
  type: GlobalSearchCollectionName
  meta: string | null
}

interface GlobalSearchUser extends BaseGlobalSearchEntity {
  uuid: UserUuid
  name: string
  type: GlobalSearchCollectionName.USER
}

interface GlobalSearchContact extends BaseGlobalSearchEntity {
  uuid: ContactUuid
  name: string
  type: GlobalSearchCollectionName.CONTACT
}

export interface GlobalSearchIndex {
  entity: GlobalSearchContact | GlobalSearchUser
  textMatch: number
}
