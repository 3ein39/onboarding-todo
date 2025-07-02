import { z } from 'zod'

import { settingsRoleUuidSchema } from '@/modules/settings'

export const userUpdateFormSchema = z.object({
  roles: z.object({
    uuid: settingsRoleUuidSchema,
    name: z.string(),
  }).array(),
})

export type UserUpdateForm = z.infer<typeof userUpdateFormSchema>
