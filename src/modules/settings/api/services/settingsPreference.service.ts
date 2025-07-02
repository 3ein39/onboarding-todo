import type { DefaultPreferences } from '@wisemen/vue-core-modules'
import type { Result } from 'neverthrow'
import {
  err,
  ok,
  ResultAsync,
} from 'neverthrow'

import {
  updateUiPreferencesV1,
  viewUiPreferencesV1,
} from '@/client'
import type { SettingsPreference } from '@/modules/settings/models/preference/settingsPreference.model.ts'
import {
  SettingsDefaultPreferencesTransformer,
  SettingsPreferencesTransformer,
} from '@/modules/settings/models/preference/settingsPreference.transformer.ts'
import type { SettingsPreferenceUpdateForm } from '@/modules/settings/models/preference/settingsPreferenceUpdateForm.model.ts'
export class SettingsPreferenceService {
  static async get(): Promise<Result<SettingsPreference, Error>> {
    const response = await ResultAsync.fromPromise(
      viewUiPreferencesV1(),
      () => new Error(`Failed to fetch UI preferences`),
    )

    if (response.isErr()) {
      return err(response.error)
    }

    return ok(SettingsPreferencesTransformer.fromDto(response.value.data))
  }

  static async update(preference: SettingsPreferenceUpdateForm): Promise<Result<void, Error>> {
    const response = await ResultAsync.fromPromise(
      updateUiPreferencesV1({
        body: SettingsPreferencesTransformer.toDto(preference),
      }),
      () => new Error('Failed to fetch UI preferences'),
    )

    if (response.isErr()) {
      throw response.error
    }

    return ok()
  }

  static async updateDefault(preference: DefaultPreferences): Promise<Result<void, Error>> {
    const response = await ResultAsync.fromPromise(
      updateUiPreferencesV1({
        body: SettingsDefaultPreferencesTransformer.toDto(preference),
      }),
      () => new Error('Failed to update default UI preferences'),
    )

    if (response.isErr()) {
      throw response.error
    }

    return ok()
  }
}
