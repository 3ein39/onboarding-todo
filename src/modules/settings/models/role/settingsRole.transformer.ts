import type { SettingsPermissionGroup } from '@/modules/settings/models/permission/settingsPermission.model.ts'
import type { SettingsRole } from '@/modules/settings/models/role/settingsRole.model.ts'
import type { SettingsRoleDto } from '@/modules/settings/models/role/settingsRoleDto.model.ts'
import type { SettingsRolePermissionUpdateDto } from '@/modules/settings/models/role/settingsRolePermissionUpdateDto.model.ts'
import type { SettingsRolePermissionUpdateForm } from '@/modules/settings/models/role/settingsRolePermissionUpdateForm.model.ts'
import type { SettingsRoleUuid } from '@/modules/settings/models/role/settingsRoleUuid.model.ts'

export class SettingsRolePermissionUpdateTransformer {
  static toDto(form: SettingsRolePermissionUpdateForm): SettingsRolePermissionUpdateDto {
    return {
      roles: form.roles
        .filter((role) => role.isEditable)
        .map((role) => ({
          roleUuid: role.roleUuid,
          permissions: role.permissions.flatMap((permission) => permission.actions),
        })),
    }
  }

  static toForm(roles: SettingsRole[], permissions: SettingsPermissionGroup[]): SettingsRolePermissionUpdateForm {
    return {
      roles: roles.map((role) => ({
        roleUuid: role.uuid,
        isEditable: !role.isSystemAdmin,
        permissions: permissions.map((permission) => {
          const filteredActions = permission.items
            .filter((action) => role.permissions.includes(action.key))
            .flatMap((action) => action.key)

          return {
            actions: filteredActions,
            key: permission.name,
          }
        }),
      })),
    }
  }
}

export class SettingsRoleTransformer {
  static fromDto(dto: SettingsRoleDto): SettingsRole {
    return {
      uuid: dto.uuid as SettingsRoleUuid,
      isDefault: dto.isDefault,
      isSystemAdmin: dto.isSystemAdmin,
      name: dto.name,
      permissions: dto.permissions,
    }
  }
}
