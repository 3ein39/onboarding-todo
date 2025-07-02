import type { Icon } from '@wisemen/vue-core-components'

export enum CommandMenuCategory {
  CONTACT = 'contact',
  NAVIGATION = 'navigation',
  SETTINGS = 'settings',
  USER = 'user',
}

export interface CommandMenuAction {
  id: string
  isHidden?: boolean
  actions?: CommandMenuAction[]
  breadcrumbs: string[]
  category: CommandMenuCategory
  icon: Icon
  keywords: string[]
  label: string
  onSelect: () => void
}

export type CommandMenuResult = CommandMenuAction
