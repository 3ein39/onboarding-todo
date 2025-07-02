import type {
  PaginatedData,
  PaginationOptions,
} from '@wisemen/vue-core-components'
import { PaginationParamsBuilder } from '@wisemen/vue-core-components'
import type { Result } from 'neverthrow'
import {
  err,
  ok,
  ResultAsync,
} from 'neverthrow'

import {
  setUserRolesV1,
  viewUserDetailV1,
  viewUserIndexV1,
} from '@/client'
import type { UserDetail } from '@/models/user/detail/userDetail.model'
import type { UserIndex } from '@/models/user/index/userIndex.model'
import type { UserIndexPagination } from '@/models/user/index/userIndexPagination.model.ts'
import {
  UserIndexPaginationTransformer,
  UserIndexTransformer,
  UserTransformer,
} from '@/models/user/user.transformer'
import type { UserUuid } from '@/models/user/userUuid.model'
import type { SettingsRoleUuid } from '@/modules/settings/models/role/settingsRoleUuid.model.ts'

export class SettingsUserService {
  static async getAll(paginationOptions: PaginationOptions<UserIndexPagination>): Promise<PaginatedData<UserIndex>> {
    const query = new PaginationParamsBuilder(paginationOptions)
      .build(UserIndexPaginationTransformer.toDto)

    const response = await viewUserIndexV1({
      query,
    })

    return {
      data: response.data.items.map(UserIndexTransformer.fromDto),
      meta: response.data.meta,
    }
  }

  static async getByUuid(userUuid: UserUuid): Promise<UserDetail> {
    const response = await viewUserDetailV1({
      path: {
        uuid: userUuid,
      },
    })

    return UserTransformer.fromDto(response.data)
  }

  static async updateRoles(userUuid: UserUuid, roleUuids: SettingsRoleUuid[]): Promise<Result<void, Error>> {
    const result = await ResultAsync.fromPromise(
      setUserRolesV1({
        body: {
          roleUuids,
        },
        path: {
          user: userUuid,
        },
      }),
      () => new Error('Failed to update user roles'),
    )

    if (result.isOk()) {
      return ok()
    }

    return err(result.error)
  }
}
