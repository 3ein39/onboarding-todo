import { viewPermissionIndexV1 } from '@/client'
import type { SettingsPermissionGroup } from '@/modules/settings/models/permission/settingsPermission.model.ts'
import { SettingsPermissionTransformer } from '@/modules/settings/models/permission/settingsPermission.transformer.ts'

export class SettingsPermissionService {
  static async getAll(): Promise<SettingsPermissionGroup[]> {
    const response = await viewPermissionIndexV1()

    return SettingsPermissionTransformer.fromDto(response.data)
  }
}
