import type { SettingsPermissionGroup } from '@/modules/settings/models/permission/settingsPermission.model.ts'
import type { SettingsPermissionIndexDto } from '@/modules/settings/models/permission/settingsPermissionIndexDto.model.ts'

export class SettingsPermissionTransformer {
  static fromDto(dto: SettingsPermissionIndexDto): SettingsPermissionGroup[] {
    return dto.groups.map((item) => {
      return {
        name: item.name,
        items: item.permissions.map((permission) => {
          return {
            name: permission.name,
            description: permission.description,
            key: permission.key,
          }
        }),
      }
    })
  }
}
