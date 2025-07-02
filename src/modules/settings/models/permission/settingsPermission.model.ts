import { z } from 'zod'

import { Permission } from '@/client'

export interface SettingsPermissionItem {
  name: string
  description: string
  key: Permission
}

export interface SettingsPermissionGroup {
  name: string
  items: SettingsPermissionItem[]
}

export const settingsPermissionSchema = z.nativeEnum(Permission)
