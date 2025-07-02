import {
  http,
  HttpResponse,
} from 'msw'

import { getPaginatedJson } from '@/mocks/handlers/user.mock.ts'
import type { SettingsRoleDto } from '@/modules/settings'
import type { SettingsRoleUuid } from '@/modules/settings'
import { SettingsRoleDtoBuilder } from '@/modules/settings'
import { UuidUtil } from '@/utils/uuid.util.ts'

const ROLE_ADMIN: SettingsRoleDto = new SettingsRoleDtoBuilder()
  .withName('Admin')
  .build()

const ROLE_MANAGER: SettingsRoleDto = new SettingsRoleDtoBuilder()
  .withName('Manager')
  .build()

const roles: SettingsRoleDto[] = [
  ROLE_ADMIN,
  ROLE_MANAGER,
]

export const settingsRoleHandlers = [
  http.get('*/api/v1/roles', ({
    request,
  }) => {
    const url = new URL(request.url)

    const limit = Number(url.searchParams.get('pagination.limit')) || 20
    const offset = Number(url.searchParams.get('pagination.offset')) || 0

    const paginatedRoles = roles.slice(offset, offset + limit)

    return HttpResponse.json(getPaginatedJson(paginatedRoles))
  }),

  http.get('*/api/v1/roles/:roleUuid', () => {
    const roleUuid = UuidUtil.getRandom<SettingsRoleUuid>()

    const role = roles.find((r) => r.uuid === roleUuid)

    if (!role) {
      return new HttpResponse(null, {
        status: 404,
      })
    }

    return HttpResponse.json(role)
  }),

  http.post('*/api/v1/roles', async ({
    request,
  }) => {
    const body = await request.json() as Partial<SettingsRoleDto>

    const roleUuid = UuidUtil.getRandom<SettingsRoleUuid>()
    const now = new Date().toISOString()

    const role: SettingsRoleDto = {
      ...new SettingsRoleDtoBuilder().build(),
      ...body,
      uuid: roleUuid,
      createdAt: now,
      updatedAt: now,

      name: body.name ?? 'New Role',
      permissions: body.permissions ?? [],
    }

    roles.push(role)

    return HttpResponse.json(role, {
      status: 201,
    })
  }),

  http.patch('*/api/v1/roles/:roleUuid', async ({
    request,
  }) => {
    const roleUuid = UuidUtil.getRandom<SettingsRoleUuid>()
    const body = await request.json() as Partial<SettingsRoleDto>

    const roleIndex = roles.findIndex((r) => r.uuid === roleUuid)

    if (roleIndex === -1) {
      return new HttpResponse(null, {
        status: 404,
      })
    }

    roles[roleIndex] = {
      ...roles[roleIndex],
      ...body,
      uuid: roles[roleIndex].uuid,
      createdAt: roles[roleIndex].createdAt,
      updatedAt: new Date().toISOString(),
    }

    return HttpResponse.json(roles[roleIndex])
  }),

]
