import { Permission } from '@/client'
import type { SettingsRolePermissionUpdateDto } from '@/modules/settings/models/role/settingsRolePermissionUpdateDto.model.ts'
import type { SettingsRoleUuid } from '@/modules/settings/models/role/settingsRoleUuid.model.ts'
import { UuidUtil } from '@/utils/uuid.util.ts'

export class SettingsRolePermissionUpdateDtoBuilder {
  value: SettingsRolePermissionUpdateDto = {
    roles: [
      {
        roleUuid: UuidUtil.getRandom<SettingsRoleUuid>(),
        permissions: [
          Permission.ALL_PERMISSIONS,
        ],
      },
    ],
  }

  build(): SettingsRolePermissionUpdateDto {
    return this.value
  }
}
