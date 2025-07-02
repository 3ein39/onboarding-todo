import type { Component } from 'vue'

export const icons = {
  appleLogo: import('./AppleLogoIcon.vue'),
  barChartSquare: import('./BarChartSquareIcon.vue'),
  bell: import('./BellIcon.vue'),
  bellArrow: import('./BellArrowIcon.vue'),
  bellSlash: import('./BellSlashIcon.vue'),
  bottomLeftCorner: import('./BottomLeftCornerIcon.vue'),
  bottomRightCorner: import('./BottomRightCornerIcon.vue'),
  brush: import('./BrushIcon.vue'),
  chevronDown: import('./ChevronDownIcon.vue'),
  chevronUp: import('./ChevronUpIcon.vue'),
  copy: import('./CopyIcon.vue'),
  edit: import('./EditIcon.vue'),
  editPen: import('./EditPenIcon.vue'),
  ellipse: import('./EllipseIcon.vue'),
  enterKey: import('./EnterKeyIcon.vue'),
  escKey: import('./EscKeyIcon.vue'),
  file: import('./FileIcon.vue'),
  filterLines: import('./FilterLinesIcon.vue'),
  googleLogo: import('./GoogleLogoIcon.vue'),
  infoCircle: import('./InfoCircleIcon.vue'),
  logout: import('./LogoutIcon.vue'),
  moon: import('./MoonIcon.vue'),
  notification: import('./NotificationIcon.vue'),
  settings: import('./SettingsIcon.vue'),
  shield: import('./ShieldIcon.vue'),
  stars: import('./StarsIcon.vue'),
  sun: import('./SunIcon.vue'),
  sunset: import('./SunsetIcon.vue'),
  threeDots: import('./ThreeDotsIcon.vue'),
  trash: import('./TrashIcon.vue'),
  user: import('./UserIcon.vue'),
  users: import('./UsersIcon.vue'),
  userSquare: import('./UserSquareIcon.vue'),
} satisfies Record<string, Component>

type CustomIcons = {
  [K in keyof typeof icons]: Component
}

declare module '@wisemen/vue-core-components' {
  interface Icons extends CustomIcons {}
}
