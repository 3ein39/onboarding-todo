import { useVcDialog } from '@wisemen/vue-core-components'
import { ResultAsync } from 'neverthrow'
import type { ComputedRef } from 'vue'
import {
  onMounted,
  onUnmounted,
} from 'vue'
import { onBeforeRouteLeave } from 'vue-router'

import { i18nPlugin } from '@/plugins/i18n.plugin.ts'

let pendingPromise: Promise<void> | null | void = null

export function useUnsavedChanges(isDirty: ComputedRef<boolean>) {
  const confirmDialog = useVcDialog({
    component: () => import('@/components/app/dialog/AppConfirmDialog.vue'),
  })

  function handleUnsavedClose(): Promise<void> {
    const i18n = i18nPlugin.global

    pendingPromise = new Promise((resolve, reject) => {
      void confirmDialog.open({
        title: i18n.t('component.unsaved_changes_dialog.title'),
        isDestructive: true,
        cancelText: i18n.t('component.unsaved_changes_dialog.cancel'),
        confirmText: i18n.t('component.unsaved_changes_dialog.confirm'),
        description: i18n.t('component.unsaved_changes_dialog.description'),
        onClosed: () => {
          reject(new Error('Action cancelled'))
        },
        onConfirm: () => {
          confirmDialog.close()
          resolve()
        },
      })
    })

    return pendingPromise
  }

  onBeforeRouteLeave(async (_to, _from) => {
    if (!isDirty.value) {
      return true
    }

    if (pendingPromise === null) {
      pendingPromise = handleUnsavedClose()
    }
    else {
      return false
    }

    const result = await ResultAsync.fromPromise(
      pendingPromise,
      () => new Error('Action cancelled'),
    )

    result.match(
      () => {
        pendingPromise = null
      },
      () => {
        pendingPromise = null

        return false
      },
    )
  })

  onUnmounted(() => {
    window.onbeforeunload = null
  })

  onMounted(() => {
    window.onbeforeunload = (): string | null => {
      if (isDirty.value) {
        return i18nPlugin.global.t('component.unsaved_changes_dialog.description')
      }

      return null
    }
  })

  return {
    handleUnsavedClose,
  }
}
