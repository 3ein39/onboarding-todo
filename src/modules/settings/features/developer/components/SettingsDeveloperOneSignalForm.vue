<script setup lang="ts">
import {
  usePagination,
  useVcToast,
  VcSelect,
  VcSelectItem,
  VcTextField,
} from '@wisemen/vue-core-components'
import { useForm } from 'formango'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import AppGrid from '@/components/app/grid/AppGrid.vue'
import AppForm from '@/components/form/AppForm.vue'
import FormFieldset from '@/components/form/FormFieldset.vue'
import FormSubmitButton from '@/components/form/FormSubmitButton.vue'
import { useApiErrorToast } from '@/composables/api-error-toast/apiErrorToast.composable'
import type { UserIndex } from '@/models/user/index/userIndex.model.ts'
import type { UserIndexPagination } from '@/models/user/index/userIndexPagination.model.ts'
import { useSettingsUserIndexQuery } from '@/modules/settings'
import { useSettingsSendOneSignalPushNotificationMutation } from '@/modules/settings/api/mutations/settingsSendOneSignalPushNotification.mutation.ts'
import { settingsOneSignalPushNotificationFormSchema } from '@/modules/settings/models/one-signal/settingsOneSignalPushNotificationForm.model.ts'
import { toFormField } from '@/utils/formango.util'

const i18n = useI18n()
const toast = useVcToast()
const errorToast = useApiErrorToast()

const userPagination = usePagination<UserIndexPagination>({
  isRouteQueryEnabled: false,
})

const userQuery = useSettingsUserIndexQuery(userPagination.paginationOptions)

const userSelectItems = computed<UserIndex[]>(() => userQuery.data.value?.data ?? [])

const oneSignalPushNotificationMutation = useSettingsSendOneSignalPushNotificationMutation()

const form = useForm({
  initialState: () => {
    return {
      title: null,
      name: null,
      description: null,
      users: [],
    }
  },
  schema: settingsOneSignalPushNotificationFormSchema,
  onSubmit: async (data) => {
    const result = await oneSignalPushNotificationMutation.execute({
      body: data,
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

const title = form.register('title')
const name = form.register('name')
const description = form.register('description')
const users = form.register('users')
</script>

<template>
  <AppForm :form="form">
    <template #default="{ formId }">
      <FormFieldset
        :title="i18n.t('module.settings.developer.one_signal_push_notification')"
      >
        <AppGrid :cols="2">
          <VcTextField
            v-bind="toFormField(title)"
            :label="i18n.t('shared.title')"
          />
          <VcTextField
            v-bind="toFormField(name)"
            :label="i18n.t('shared.name')"
          />
          <VcTextField
            v-bind="toFormField(description)"
            :label="i18n.t('shared.description')"
          />
          <VcSelect
            v-bind="toFormField(users)"
            :display-fn="(value) => `${value.firstName} ${value.lastName}`"
            :multiple="true"
            :placeholder="i18n.t('component.select.search_placeholder')"
            :label="i18n.t('shared.users')"
            class="col-span-1"
          >
            <VcSelectItem
              v-for="item in userSelectItems"
              :key="item.uuid"
              :value="item"
              :label="item"
            >
              {{ `${item.firstName} ${item.lastName}` }}
            </VcSelectItem>
          </VcSelect>
          <FormSubmitButton
            :form-id="formId"
            :form="form"
            :label="i18n.t('module.settings.developer.send_notification')"
            class="w-min"
          />
        </AppGrid>
      </FormFieldset>
    </template>
  </AppForm>
</template>
