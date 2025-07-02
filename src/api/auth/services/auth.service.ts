import type { Result } from 'neverthrow'
import {
  err,
  ok,
  ResultAsync,
} from 'neverthrow'

import { viewMeV1 } from '@/client'
import type { UserDetail } from '@/models/user/detail/userDetail.model'
import { UserTransformer } from '@/models/user/user.transformer'

export class AuthService {
  static async getMe(): Promise<Result<UserDetail, Error>> {
    const response = await ResultAsync.fromPromise(
      viewMeV1({
        responseValidator: undefined,
      }),
      () => new Error('Failed to fetch UI preferences'),
    )

    if (response.isErr()) {
      return err(response.error)
    }

    return ok(UserTransformer.fromDto(response.value.data))
  }
}
