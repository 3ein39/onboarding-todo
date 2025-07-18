import {
  FontSize,
  Locale,
  UiTheme,
} from '@/client'
import type { SettingsPreferenceDto } from '@/modules/settings/models/preference/settingsPreferenceDto.model.ts'

export class SettingsPreferenceDtoBuilder {
  value: SettingsPreferenceDto = {
    fontSize: FontSize.DEFAULT,
    highContrast: false,
    language: Locale.EN_US,
    reduceMotion: false,
    showShortcuts: true,
    theme: UiTheme.LIGHT,
  }

  build(): SettingsPreferenceDto {
    return this.value
  }

  withLanguage(locale: Locale): SettingsPreferenceDtoBuilder {
    this.value.language = locale

    return this
  }
}
