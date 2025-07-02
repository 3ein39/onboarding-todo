import type { Result } from 'neverthrow'
import {
  err,
  ok,
  ResultAsync,
} from 'neverthrow'
import { z } from 'zod'

import {
  createRoleV1,
  deleteRoleV1,
  updateRolesPermissionsV1,
  viewRoleIndexV1,
} from '@/client'
import type { SettingsRole } from '@/modules/settings/models/role/settingsRole.model.ts'
import {
  SettingsRolePermissionUpdateTransformer,
  SettingsRoleTransformer,
} from '@/modules/settings/models/role/settingsRole.transformer.ts'
import type { SettingsRolePermissionUpdateForm } from '@/modules/settings/models/role/settingsRolePermissionUpdateForm.model.ts'
import type { SettingsRoleUuid } from '@/modules/settings/models/role/settingsRoleUuid.model.ts'

export class SettingsRoleService {
  static async create(roleName: string): Promise<Result<void, Error>> {
    const result = await ResultAsync.fromPromise(
      createRoleV1({
        body: {
          name: roleName,
        },
      }),
      () => new Error('Failed to create role'),
    )

    if (result.isOk()) {
      return ok()
    }

    return err(result.error)
  }

  static async delete(roleUuid: SettingsRoleUuid): Promise<Result<void, Error>> {
    return await ResultAsync.fromPromise(
      deleteRoleV1({
        path: {
          role: roleUuid,
        },
      }),
      () => new Error('Failed to delete role'),
    ).map((res) => res.data)
  }

  static async getAll(): Promise<SettingsRole[]> {
    const response = await viewRoleIndexV1({
      responseValidator: async (data) => {
        return await z.object({
          items: z.object({
            uuid: z.string().uuid(),
            createdAt: z.string().datetime(),
            updatedAt: z.string().datetime(),
            name: z.string(),
            permissions: z.string().array(),
          }).array(),
        }).parseAsync(data)
      },
    })

    return response.data.items.map(SettingsRoleTransformer.fromDto)
  }

  static async updateRolesInBulk(form: SettingsRolePermissionUpdateForm): Promise<Result<void, Error>> {
    const body = SettingsRolePermissionUpdateTransformer.toDto(form)

    return await ResultAsync.fromPromise(
      updateRolesPermissionsV1({
        body,
      }),
      () => new Error('Failed to create role'),
    ).map((res) => res.data)
  }
}
