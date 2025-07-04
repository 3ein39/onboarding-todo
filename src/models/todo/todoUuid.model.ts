import { z } from 'zod'

export const todoUuidSchema = z.string().uuid().brand('TodoUuid')

export type TodoUuid = z.infer<typeof todoUuidSchema>
