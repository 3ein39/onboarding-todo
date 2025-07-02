import { useClipboard } from '@vueuse/core'
import { useVcToast } from '@wisemen/vue-core-components'
import { useI18n } from 'vue-i18n'

import { onCreated } from '@/composables/created/created.composable.ts'
import { TEST_ID } from '@/constants/testId.constant.ts'
import { ApiErrorEnumUtil } from '@/models/api-error/apiError.model.ts'
import { setQueryOnErrorCallback } from '@/plugins/vueQuery.plugin.ts'
import { ApiErrorUtil } from '@/utils/apiError.util.ts'
import { LoggerUtil } from '@/utils/logger.util.ts'

export function useQueryErrorToast() {
  const toast = useVcToast()
  const i18n = useI18n()

  function onError(error: Error): void {
    const clipboard = useClipboard({
      copiedDuring: 2000,
    })

    LoggerUtil.error(error)

    if (error.name === 'ZodError') {
      toast.error({
        testId: TEST_ID.SHARED.MALFORMED_RESPONSE_TOAST,
        title: i18n.t('error.default_error.title'),
        actions: [
          {
            label: 'Copy error',
            onClick: (): void => {
              clipboard.copy(`API returned a malformed response.\n\n${JSON.stringify(error, null, 2)}`)
            },
          },
        ],
        description: `API returned a malformed response.`,
        icon: 'alertCircle',
      })

      return
    }

    if (ApiErrorUtil.isError(error)) {
      const i18nKeyForError = ApiErrorEnumUtil.getI18nKeyForError(error)

      toast.error({
        title: i18n.t('error.default_error.title'),
        description: i18nKeyForError !== null
          ? i18n.t(i18nKeyForError)
          : ApiErrorUtil.getMessage(error) ?? i18n.t('error.bad_request.description'),
        icon: 'alertCircle',
      })

      return
    }

    toast.error({
      title: i18n.t('error.default_error.title'),
      description: error.message,
      icon: 'alertCircle',
    })
  }

  onCreated(() => {
    setQueryOnErrorCallback(onError)
  })
}
