import type { UserIndexDto } from '@/models/user/index/userIndexDto.model.ts'
import type { UserRole } from '@/models/user/roles/role.model.ts'
import type { UserUuid } from '@/models/user/userUuid.model.ts'
import type { SettingsRoleUuid } from '@/modules/settings'
import { UuidUtil } from '@/utils/uuid.util.ts'

export class UserIndexDtoBuilder {
  value: UserIndexDto = {
    uuid: UuidUtil.getRandom<UserUuid>(),
    email: 'john.doe@gmail.com',
    firstName: 'John',
    lastName: 'Doe',
    roles: [
      {
        uuid: UuidUtil.getRandom<SettingsRoleUuid>(),
        name: 'admin',
      },
    ],
  }

  build(): UserIndexDto {
    return this.value
  }

  withEmail(email: string): UserIndexDtoBuilder {
    this.value.email = email

    return this
  }

  withFirstName(firstName: string): UserIndexDtoBuilder {
    this.value.firstName = firstName

    return this
  }

  withLastName(lastName: string): UserIndexDtoBuilder {
    this.value.lastName = lastName

    return this
  }

  withRoles(roles: UserRole[]): UserIndexDtoBuilder {
    this.value.roles = roles

    return this
  }

  withUuid(uuid: UserUuid): UserIndexDtoBuilder {
    this.value.uuid = uuid

    return this
  }
}
