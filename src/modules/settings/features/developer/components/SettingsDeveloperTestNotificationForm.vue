<script setup lang="ts">
import {
  useVcToast,
  VcTextField,
} from '@wisemen/vue-core-components'
import { useForm } from 'formango'
import { useI18n } from 'vue-i18n'
import { z } from 'zod'

import AppForm from '@/components/form/AppForm.vue'
import FormFieldset from '@/components/form/FormFieldset.vue'
import FormLayout from '@/components/form/FormLayout.vue'
import FormSubmitButton from '@/components/form/FormSubmitButton.vue'
import { useApiErrorToast } from '@/composables/api-error-toast/apiErrorToast.composable'
import { useSettingsSendTestNotification } from '@/modules/settings/api/mutations/settingsSendTestNotification.mutation.ts'
import { toFormField } from '@/utils/formango.util'

const i18n = useI18n()
const toast = useVcToast()
const errorToast = useApiErrorToast()
const testNotificationMutation = useSettingsSendTestNotification()

const form = useForm({
  initialState: () => {
    return {
      message: null,
    }
  },
  schema: z.object({
    message: z.string(),
  }),
  onSubmit: async (data) => {
    const result = await testNotificationMutation.execute({
      body: data.message,
    })

    result.match(
      () => {
        form.reset()
      },
      (error) => errorToast.show(error),
    )
  },
  onSubmitError: () => {
    toast.error({
      title: i18n.t('error.invalid_form_input.title'),
      description: i18n.t('error.invalid_form_input.description'),
    })
  },
})

const message = form.register('message')
</script>

<template>
  <AppForm :form="form">
    <template #default="{ formId }">
      <FormFieldset
        :title="i18n.t('module.settings.developer.test_notification')"
      >
        <FormLayout>
          <VcTextField
            v-bind="toFormField(message)"
            :label="i18n.t('module.settings.developer.message')"
          />
          <FormSubmitButton
            :form-id="formId"
            :form="form"
            :label="i18n.t('module.settings.developer.send_notification')"
            class="w-min"
          />
        </FormLayout>
      </FormFieldset>
    </template>
  </AppForm>
</template>
