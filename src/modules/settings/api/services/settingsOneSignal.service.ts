import type { Result } from 'neverthrow'
import { ResultAsync } from 'neverthrow'

import { sendPushNotificationV1 } from '@/client'
import { SettingsOneSignalPushNotificationCreateTransformer } from '@/modules/settings/models/one-signal/settingsOneSignalPushNotification.transformer.ts'
import type { SettingsOneSignalPushNotificationForm } from '@/modules/settings/models/one-signal/settingsOneSignalPushNotificationForm.model.ts'

export class SettingsOneSignalService {
  static async sendPushNotification(form: SettingsOneSignalPushNotificationForm): Promise<Result<unknown, Error>> {
    const result = await ResultAsync.fromPromise(
      sendPushNotificationV1({
        body: SettingsOneSignalPushNotificationCreateTransformer.toDto(form),
      }),
      () => new Error('Failed to send push notification'),
    )

    return result.map((res) => {
      return res.data
    })
  }
}
