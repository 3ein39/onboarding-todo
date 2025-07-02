<script setup lang="ts">
import {
  useVcToast,
  VcAddressAutocomplete,
  VcDateField,
  VcPhoneNumberField,
  VcTextField,
} from '@wisemen/vue-core-components'
import { useForm } from 'formango'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

import FormGrid from '@/components/app/grid/FormGrid.vue'
import AppTeleport from '@/components/app/teleport/AppTeleport.vue'
import AppForm from '@/components/form/AppForm.vue'
import FormFileUpload from '@/components/form/file-upload/FormFileUpload.vue'
import FormFieldset from '@/components/form/FormFieldset.vue'
import FormLayout from '@/components/form/FormLayout.vue'
import FormSubmitButton from '@/components/form/FormSubmitButton.vue'
import { useApiErrorToast } from '@/composables/api-error-toast/apiErrorToast.composable'
import { TEST_ID } from '@/constants/testId.constant'
import { ContactUpdateTransformer } from '@/models/contact/contact.transformer.ts'
import type { ContactDetail } from '@/models/contact/detail/contactDetail.model'
import { contactUpdateFormSchema } from '@/models/contact/update/contactUpdateForm.model'
import { useContactUpdateMutation } from '@/modules/contact/api/mutations/contactUpdate.mutation'
import { toFormField } from '@/utils/formango.util'

const props = defineProps<{
  contact: ContactDetail
}>()

const i18n = useI18n()
const router = useRouter()
const toast = useVcToast()
const errorToast = useApiErrorToast()
const contactUpdateMutation = useContactUpdateMutation()

const form = useForm({
  initialState: () => ContactUpdateTransformer.toForm(props.contact),
  schema: contactUpdateFormSchema,
  onSubmit: async (values) => {
    const response = await contactUpdateMutation.execute({
      body: values,
      params: {
        contactUuid: props.contact.uuid,
      },
    })

    response.match(
      async () => {
        await router.push({
          name: 'contact-detail',
          params: {
            contactUuid: props.contact.uuid,
          },
        })
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

const file = form.register('file')
const firstName = form.register('firstName')
const lastName = form.register('lastName')
const email = form.register('email')
const phone = form.register('phone')
const address = form.register('address')
const birthDate = form.register('birthDate')
</script>

<template>
  <AppForm :form="form">
    <template #default="{ formId }">
      <AppTeleport to="headerActions">
        <FormSubmitButton
          :form-id="formId"
          :form="form"
          :data-test-id="TEST_ID.CONTACTS.FORM.SUBMIT_BUTTON"
          :label="i18n.t('form.save_changes')"
        />
      </AppTeleport>

      <FormLayout>
        <FormFileUpload
          :label="i18n.t('module.contact.file')"
          v-bind="toFormField(file)"
        />
        <FormFieldset
          :title="i18n.t('module.contact.personal_info')"
        >
          <FormGrid :cols="2">
            <VcTextField
              v-bind="toFormField(firstName)"
              :label="i18n.t('module.contact.first_name')"
            />
            <VcTextField
              v-bind="toFormField(lastName)"
              :label="i18n.t('module.contact.last_name')"
            />
            <VcDateField
              v-bind="toFormField(birthDate)"
              :label="i18n.t('module.contact.birth_date')"
            />
          </FormGrid>
        </FormFieldset>

        <FormFieldset
          :title="i18n.t('module.contact.contact_info')"
        >
          <FormGrid :cols="2">
            <VcTextField
              v-bind="toFormField(email)"
              :label="i18n.t('module.contact.email')"
            />
            <VcPhoneNumberField
              v-bind="toFormField(phone)"
              :label="i18n.t('module.contact.phone')"
            />
            <VcAddressAutocomplete
              v-bind="toFormField(address)"
              :label="i18n.t('module.contact.address')"
              :placeholder="i18n.t('module.contact.address')"
            />
          </FormGrid>
        </FormFieldset>
      </FormLayout>
    </template>
  </AppForm>
</template>
