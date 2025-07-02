import { z } from 'zod'

export const notificationUuidSchema = z.string().uuid().brand('NotificationUuid')

export type NotificationUuid = z.infer<typeof notificationUuidSchema>
