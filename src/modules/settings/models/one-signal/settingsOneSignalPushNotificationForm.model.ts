import { z } from 'zod'

import { userUuidSchema } from '@/models/user/userUuid.model.ts'

export const settingsOneSignalPushNotificationFormSchema = z.object({
  title: z.string().min(0),
  name: z.string().min(0),
  description: z.string().min(0),
  users: z.object({
    uuid: userUuidSchema,
    firstName: z.string(),
    lastName: z.string(),
  }).array(),
})

export type SettingsOneSignalPushNotificationForm = z.infer<typeof settingsOneSignalPushNotificationFormSchema>
