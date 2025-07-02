import type {
  Permission,
  ViewRoleDetailResponse,
} from '@/client'
import type { UserDetailDto } from '@/models/user/detail/userDetailDto.model'
import type { UserUuid } from '@/models/user/userUuid.model.ts'
import type { SettingsRoleDto } from '@/modules/settings'
import { SettingsRoleDtoBuilder } from '@/modules/settings'
import { UuidUtil } from '@/utils/uuid.util.ts'

export class UserDetailDtoBuilder {
  value: UserDetailDto = {
    uuid: UuidUtil.getRandom<UserUuid>(),
    email: 'john.doe@email.com',
    firstName: 'John',
    lastName: 'Doe',
    roles: [
      new SettingsRoleDtoBuilder().build(),
    ],
  }

  build(): UserDetailDto {
    return this.value
  }

  withEmail(email: string): UserDetailDtoBuilder {
    this.value.email = email

    return this
  }

  withFirstName(firstName: string): UserDetailDtoBuilder {
    this.value.firstName = firstName

    return this
  }

  withLastName(lastName: string): UserDetailDtoBuilder {
    this.value.lastName = lastName

    return this
  }

  withPermissions(permissions: Permission[]): UserDetailDtoBuilder {
    this.value.roles = [
      {
        uuid: UuidUtil.getRandom(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isDefault: false,
        isSystemAdmin: true,
        name: 'Admin',
        permissions,
      },
    ]

    return this
  }

  withRoles(roles: SettingsRoleDto[]): UserDetailDtoBuilder {
    this.value.roles = roles.map((roleInput): ViewRoleDetailResponse => ({
      uuid: roleInput.uuid,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isDefault: roleInput.isDefault ?? false,
      isSystemAdmin: roleInput.isSystemAdmin ?? false,
      name: roleInput.name,
      permissions: roleInput.permissions ?? [],
    }))

    return this
  }

  withUuid(uuid: UserUuid): UserDetailDtoBuilder {
    this.value.uuid = uuid

    return this
  }
}
