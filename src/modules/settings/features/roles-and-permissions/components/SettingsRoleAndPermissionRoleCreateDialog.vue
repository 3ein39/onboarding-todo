<script  lang="ts" setup="">
import {
  VcDialog,
  VcTextField,
} from '@wisemen/vue-core-components'
import { useForm } from 'formango'
import { useI18n } from 'vue-i18n'
import { z } from 'zod'

import AppDialogActionCancel from '@/components/app/dialog/AppDialogActionCancel.vue'
import AppDialogActions from '@/components/app/dialog/AppDialogActions.vue'
import AppDialogContent from '@/components/app/dialog/AppDialogContent.vue'
import AppDialogHeader from '@/components/app/dialog/AppDialogHeader.vue'
import AppForm from '@/components/form/AppForm.vue'
import FormSubmitButton from '@/components/form/FormSubmitButton.vue'
import { useApiErrorToast } from '@/composables/api-error-toast/apiErrorToast.composable.ts'
import { useSettingsRoleCreateMutation } from '@/modules/settings/api/mutations/settingsRoleCreate.mutation.ts'
import { toFormField } from '@/utils/formango.util'

const emit = defineEmits<{
  close: []
}>()

const i18n = useI18n()

const apiErrorToast = useApiErrorToast()
const settingsRoleCreateMutation = useSettingsRoleCreateMutation()

const form = useForm({
  schema: z.object({
    name: z.string(),
  }),
  onSubmit: async (values) => {
    const result = await settingsRoleCreateMutation.execute({
      body: values.name,
    })

    result.match(
      () => {
        onClose()
      },
      (error) => {
        apiErrorToast.show(error)
      },
    )
  },
})

const name = form.register('name')

function onClose(): void {
  emit('close')
}
</script>

<template>
  <VcDialog
    @close="onClose"
  >
    <AppDialogContent
      :content-title="i18n.t('module.settings.roles_and_permissions.create_role_dialog.title')"
      :content-description="i18n.t('module.settings.roles_and_permissions.create_role_dialog.description')"
      class="w-100"
    >
      <AppDialogHeader
        :title="i18n.t('module.settings.roles_and_permissions.create_role_dialog.title')"
        :description="i18n.t('module.settings.roles_and_permissions.create_role_dialog.description')"
      />

      <AppForm
        :form="form"
        :can-exit-when-dirty="true"
        class="mt-xl"
      >
        <VcTextField
          :label="i18n.t('user.name')"
          v-bind="toFormField(name)"
        />

        <AppDialogActions>
          <AppDialogActionCancel :label="i18n.t('shared.cancel')" />

          <FormSubmitButton
            :form="form"
            :label="i18n.t('shared.save')"
          />
        </AppDialogActions>
      </AppForm>
    </AppDialogContent>
  </VcDialog>
</template>
