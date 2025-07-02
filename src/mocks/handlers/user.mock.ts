/* eslint-disable project-structure/independent-modules */
import {
  http,
  HttpResponse,
} from 'msw'

import { Permission } from '@/client'
import { UserDetailDtoBuilder } from '@/models/user/detail/userDetailDto.builder.ts'
import { UserIndexDtoBuilder } from '@/models/user/index/userIndexDto.builder.ts'
import { SettingsPreferenceDtoBuilder } from '@/modules/settings/models/preference/settingsPreferenceDto.builder.ts'
import type { SettingsPreferenceDto } from '@/modules/settings/models/preference/settingsPreferenceDto.model.ts'
import type { SettingsRoleUuid } from '@/modules/settings/models/role/settingsRoleUuid.model.ts'
import type { PaginatedDtoData } from '@/types/paginatedData.type.ts'
import { UuidUtil } from '@/utils/uuid.util.ts'

const USER_1_INDEX = new UserIndexDtoBuilder()
  .withFirstName('John')
  .withLastName('Doe')
  .withEmail('John.doe@gmail.com')
  .withRoles([
    {
      uuid: UuidUtil.getRandom<SettingsRoleUuid>(),
      name: 'Admin',
    },
  ])
  .build()
const USER_2_INDEX = new UserIndexDtoBuilder()
  .withFirstName('Sylvia')
  .withLastName('Sterling')
  .withEmail('Sylvia.sterling@gmail.com')
  .withRoles([
    {
      uuid: UuidUtil.getRandom<SettingsRoleUuid>(),
      name: 'Marketing',
    },
  ])
  .build()

const USER_1_DETAIL = new UserDetailDtoBuilder()
  .withFirstName('John')
  .withLastName('Doe')
  .withEmail('John.doe@gmail.com')
  .withRoles([
    {
      uuid: UuidUtil.getRandom<SettingsRoleUuid>(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isDefault: true,
      isSystemAdmin: true,
      name: 'Admin',
      permissions: [
        Permission.ALL_PERMISSIONS,
      ],
    },
  ])
  .build()

export function getPaginatedJson<T>(response: T[]): PaginatedDtoData {
  return {
    items: response,
    meta: {
      limit: response.length,
      offset: 0,
      total: response.length,
    },
  }
}

const PREFERENCE: SettingsPreferenceDto = new SettingsPreferenceDtoBuilder().build()

export const userHandlers = [
  http.get('*/api/v1/users/*/preferences', () => {
    return HttpResponse.json(PREFERENCE)
  }),

  http.get('*/api/v1/users/:userUuid', () => {
    return HttpResponse.json(USER_1_DETAIL)
  }),

  http.get('*/api/v1/users*', ({
    request,
  }) => {
    const url = new URL(request.url)

    if (url.pathname === '/api/v1/users/me') {
      return
    }

    if (/\/\w{8}-\w{4}-\w{4}-\w{4}-\w{12}$/.test(url.pathname)) {
      return
    }

    return HttpResponse.json(getPaginatedJson([
      USER_1_INDEX,
      USER_2_INDEX,
    ]))
  }),

]
