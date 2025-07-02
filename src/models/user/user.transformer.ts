import type { UserDetail } from '@/models/user/detail/userDetail.model'
import type { UserDetailDto } from '@/models/user/detail/userDetailDto.model'
import type { UserIndexPagination } from '@/models/user/index/userIndexPagination.model.ts'
import type { UserIndexPaginationDto } from '@/models/user/index/userIndexPaginationDto.model.ts'
import type { UserUuid } from '@/models/user/userUuid.model.ts'
import type { SettingsRoleUuid } from '@/modules/settings'

import type { UserIndex } from './index/userIndex.model'
import type { UserIndexDto } from './index/userIndexDto.model'

export class UserIndexTransformer {
  static fromDto(dto: UserIndexDto): UserIndex {
    return {
      uuid: dto.uuid as UserUuid,
      email: dto.email,
      firstName: dto.firstName,
      fullName: `${dto.firstName} ${dto.lastName}`,
      lastName: dto.lastName,
      roles: dto.roles.map((role) => ({
        uuid: role.uuid as SettingsRoleUuid,
        name: role.name,
      })),
    }
  }
}

export class UserIndexPaginationTransformer {
  static toDto(pagination: UserIndexPagination): UserIndexPaginationDto {
    return {
      filter: pagination.filter,
      sort: pagination.sort,
    }
  }
}

export class UserTransformer {
  static fromDto(dto: UserDetailDto): UserDetail {
    return {
      uuid: dto.uuid as UserUuid,
      email: dto.email,
      firstName: dto.firstName,
      fullName: `${dto.firstName} ${dto.lastName}`,
      lastName: dto.lastName,
      permissions: dto.roles.flatMap((role) => role.permissions),
      roles: dto.roles.map((role) => ({
        uuid: role.uuid as SettingsRoleUuid,
        name: role.name,
      })),
    }
  }
}
