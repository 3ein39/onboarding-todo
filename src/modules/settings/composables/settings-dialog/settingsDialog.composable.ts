import { useVcDialog } from '@wisemen/vue-core-components'

export function useSettingsDialog() {
  const dialog = useVcDialog({
    component: () => import('@/modules/settings/dialogs/SettingsDialog.vue'),
  })

  return dialog
}
