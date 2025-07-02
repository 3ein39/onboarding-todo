import type { UserRole } from '@/models/user/roles/role.model.ts'
import type { UserUuid } from '@/models/user/userUuid.model'

export interface UserIndex {
  uuid: UserUuid
  email: string
  firstName: string | null
  fullName: string
  lastName: string | null
  roles: UserRole[]
}
