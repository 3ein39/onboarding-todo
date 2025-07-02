import type { Permission } from '@/client'
import type { UserUuid } from '@/models/user/userUuid.model'
import type { SettingsRoleUuid } from '@/modules/settings'

export interface UserDetail {
  uuid: UserUuid
  email: string
  firstName: string | null
  fullName: string
  lastName: string | null
  permissions: Permission[]
  roles: {
    uuid: SettingsRoleUuid
    name: string
  }[]
}
