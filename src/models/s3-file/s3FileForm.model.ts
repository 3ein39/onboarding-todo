import { z } from 'zod'

import { s3FileUuidSchema } from './s3FileUuid.model'

export const s3FileFormSchema = z.object({
  uuid: s3FileUuidSchema,
  name: z.string(),
  url: z.string().url(),
})

export type S3FileForm = z.infer<typeof s3FileFormSchema>
