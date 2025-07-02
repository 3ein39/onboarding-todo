import type { ComputedRef } from 'vue'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

import type { CommandMenuAction } from '@/components/command-menu/commandMenu.type'
import { CommandMenuCategory } from '@/components/command-menu/commandMenu.type'
import { usePreferences } from '@/composables/preferences/preferences.composable'
import { useSettingsDialog } from '@/modules/settings'

export function useCommandMenuActions(): ComputedRef<CommandMenuAction[]> {
  const router = useRouter()
  const preferences = usePreferences()
  const settingsDialog = useSettingsDialog()
  const i18n = useI18n()

  const createContactAction = computed<CommandMenuAction>(() => ({
    id: 'create-contact',
    isHidden: router.currentRoute.value.name === 'contact-create',
    breadcrumbs: [],
    category: CommandMenuCategory.CONTACT,
    icon: 'plus',
    keywords: [
      'create contact',
      'new contact',
      'add contact',
    ],
    label: i18n.t('component.command_menu.action.create_new_contact'),
    onSelect: (): void => {
      router.push({
        name: 'contact-create',
      })
    },
  }))

  const goToSettingsAction = computed<CommandMenuAction>(() => ({
    id: 'open-settings',
    breadcrumbs: [],
    category: CommandMenuCategory.NAVIGATION,
    icon: 'arrowRight',
    keywords: [
      'settings',
      'go to settings',
      'open settings',
    ],
    label: i18n.t('component.command_menu.action.open_settings'),
    onSelect: (): void => {
      settingsDialog.open()
    },
  }))

  const goToContactsAction = computed<CommandMenuAction>(() => ({
    id: 'open-contacts',
    isHidden: router.currentRoute.value.name === 'contact-overview',
    breadcrumbs: [],
    category: CommandMenuCategory.NAVIGATION,
    icon: 'arrowRight',
    keywords: [
      'contacts',
      'go to contacts',
      'open contacts',
    ],
    label: i18n.t('component.command_menu.action.open_contacts'),
    onSelect: (): void => {
      router.push({
        name: 'contact-overview',
      })
    },
  }))

  const appearanceAction = computed<CommandMenuAction>(() => ({
    id: 'appearance',
    isHidden: router.currentRoute.value.name === 'appearance',
    breadcrumbs: [],
    category: CommandMenuCategory.SETTINGS,
    icon: 'arrowRight',
    keywords: [
      'appearance',
      'go to appearance',
      'open appearance',
    ],
    label: i18n.t('component.command_menu.action.open_appearance'),
    onSelect: (): void => {
      settingsDialog.open({
        defaultView: 'appearance',
      })
    },
  }))

  const notificationsAction = computed<CommandMenuAction>(() => ({
    id: 'notifications',
    isHidden: router.currentRoute.value.name === 'notifications',
    breadcrumbs: [],
    category: CommandMenuCategory.SETTINGS,
    icon: 'arrowRight',
    keywords: [
      'notifications',
      'go to notifications',
      'open notifications',
    ],
    label: i18n.t('component.command_menu.action.open_notifications'),
    onSelect: (): void => {
      settingsDialog.open({
        defaultView: 'notifications',
      })
    },
  }))

  const enableLightModeAction = computed<CommandMenuAction>(() => ({
    id: 'enable-light-mode',
    isHidden: preferences.value.appearance === 'light',
    breadcrumbs: [
      'Appearance',
    ],
    category: CommandMenuCategory.SETTINGS,
    icon: 'sun',
    keywords: [
      'appearance',
      'enable light mode',
    ],
    label: i18n.t('component.command_menu.action.enable_light_mode'),
    onSelect: (): void => {
      preferences.value.appearance = 'light'
    },
  }))

  const enableDarkModeAction = computed<CommandMenuAction>(() => ({
    id: 'enable-dark-mode',
    isHidden: preferences.value.appearance === 'dark',
    breadcrumbs: [
      'Appearance',
    ],
    category: CommandMenuCategory.SETTINGS,
    icon: 'sun',
    keywords: [
      'appearance',
      'enable dark mode',
    ],
    label: i18n.t('component.command_menu.action.enable_dark_mode'),
    onSelect: (): void => {
      preferences.value.appearance = 'dark'
    },
  }))

  const systemPreferenceAction = computed<CommandMenuAction>(() => ({
    id: 'system-preference',
    isHidden: preferences.value.appearance === 'system',
    breadcrumbs: [
      'Appearance',
    ],
    category: CommandMenuCategory.SETTINGS,
    icon: 'sunset',
    keywords: [
      'appearance',
      'system preference',
    ],
    label: i18n.t('component.command_menu.action.change_to_system_preference'),
    onSelect: (): void => {
      preferences.value.appearance = 'system'
    },
  }))

  const setLanguageToEnglish = computed<CommandMenuAction>(() => ({
    id: 'change-language-to-en-us',
    isHidden: i18n.locale.value === 'en-US',
    breadcrumbs: [
      i18n.t('component.command_menu.breadcrumb.language'),
    ],
    category: CommandMenuCategory.SETTINGS,
    icon: 'translate',
    keywords: [
      'language',
      'english',
    ],
    label: i18n.t('component.command_menu.action.change_language_to_en_us'),
    onSelect: (): void => {
      i18n.locale.value = 'en-US'
    },
  }))

  const setLanguageToDutch = computed<CommandMenuAction>(() => ({
    id: 'change-language-to-en-nl',
    isHidden: i18n.locale.value === 'en-NL',
    breadcrumbs: [
      i18n.t('component.command_menu.breadcrumb.language'),
    ],
    category: CommandMenuCategory.SETTINGS,
    icon: 'translate',
    keywords: [
      'language',
      'dutch',
    ],
    label: i18n.t('component.command_menu.action.change_language_to_nl_be'),
    onSelect: (): void => {
      i18n.locale.value = 'en-NL'
    },
  }))

  return computed<CommandMenuAction[]>(() => [
    goToSettingsAction.value,
    goToContactsAction.value,
    createContactAction.value,
    appearanceAction.value,
    notificationsAction.value,
    enableLightModeAction.value,
    enableDarkModeAction.value,
    systemPreferenceAction.value,
    setLanguageToEnglish.value,
    setLanguageToDutch.value,
  ])
}
