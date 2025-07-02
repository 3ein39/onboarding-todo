import type { DefaultPreferences } from '@wisemen/vue-core-modules'

import type {
  FontSize,
  Locale,
} from '@/client'
import { UiTheme } from '@/client'
import type { SettingsPreference } from '@/modules/settings/models/preference/settingsPreference.model.ts'
import type { SettingsPreferenceDto } from '@/modules/settings/models/preference/settingsPreferenceDto.model.ts'
import type { SettingsPreferenceUpdateDto } from '@/modules/settings/models/preference/settingsPreferenceUpdateDto.model.ts'
import type { SettingsPreferenceUpdateForm } from '@/modules/settings/models/preference/settingsPreferenceUpdateForm.model.ts'

export class SettingsDefaultPreferencesTransformer {
  static fromDto(dto: SettingsPreferenceDto): DefaultPreferences {
    return {
      appearance: dto.theme as UiTheme,
      enableHighContrast: dto.highContrast,
      enableKeyboardShortcutHints: dto.showShortcuts,
      fontSize: dto.fontSize,
      language: dto.language,
    }
  }

  static toDto(model: DefaultPreferences): SettingsPreferenceUpdateDto {
    return {
      fontSize: model.fontSize as FontSize,
      highContrast: model.enableHighContrast,
      language: model.language as Locale,
      reduceMotion: undefined,
      showShortcuts: model.enableKeyboardShortcutHints,
      theme: model.appearance as UiTheme,
    }
  }
}

export class SettingsPreferencesTransformer {
  static fromDto(dto: SettingsPreferenceDto): SettingsPreference {
    return {
      fontSize: dto.fontSize,
      highContrast: dto.highContrast,
      language: dto.language,
      reduceMotion: dto.reduceMotion,
      showShortcuts: dto.showShortcuts,
      theme: dto.theme ?? UiTheme.SYSTEM,
    }
  }

  static toDto(form: SettingsPreferenceUpdateForm): SettingsPreferenceUpdateDto {
    return {
      fontSize: undefined,
      highContrast: undefined,
      language: form.language,
      reduceMotion: form.reduceMotion,
      showShortcuts: undefined,
      theme: form.theme,
    }
  }
}
