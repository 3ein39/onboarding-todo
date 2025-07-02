import { Permission } from '@/client'
import type { SettingsRoleDto } from '@/modules/settings/models/role/settingsRoleDto.model.ts'
import type { SettingsRoleUuid } from '@/modules/settings/models/role/settingsRoleUuid.model.ts'
import { UuidUtil } from '@/utils/uuid.util.ts'

export class SettingsRoleDtoBuilder {
  value: SettingsRoleDto = {
    uuid: UuidUtil.getRandom<SettingsRoleUuid>(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isDefault: true,
    isSystemAdmin: true,
    name: 'Admin',
    permissions: [
      Permission.ALL_PERMISSIONS,
    ],
  }

  build(): SettingsRoleDto {
    return this.value
  }

  withName(name: string): SettingsRoleDtoBuilder {
    this.value.name = name

    return this
  }
}
