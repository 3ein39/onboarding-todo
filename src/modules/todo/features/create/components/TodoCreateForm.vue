<script setup lang="ts">
import {
  useVcToast,
  VcDateField,
  VcTextarea,
  VcTextField,
} from '@wisemen/vue-core-components'
import { useForm } from 'formango'
import { useI18n } from 'vue-i18n'

import FormGrid from '@/components/app/grid/FormGrid.vue'
import FormLayout from '@/components/form/FormLayout.vue'
import FormSubmitButton from '@/components/form/FormSubmitButton.vue'
import { useApiErrorToast } from '@/composables/api-error-toast/apiErrorToast.composable'
import type { TodoCreateForm } from '@/models/todo/create/todoCreateForm.model'
import { todoCreateFormSchema } from '@/models/todo/create/todoCreateForm.model'
import { useTodoCreateMutation } from '@/modules/todo/api/mutations/todoCreate.mutation'
import { toFormField } from '@/utils/formango.util'

const props = defineProps<{
  onSuccess?: () => void
}>()

const i18n = useI18n()
const toast = useVcToast()
const errorToast = useApiErrorToast()
const todoCreateMutation = useTodoCreateMutation()

const form = useForm({
  initialState: (): TodoCreateForm => ({
    title: '',
    deadline: null,
    description: null,
  }),
  schema: todoCreateFormSchema,
  onSubmit: async (values) => {
    const result = await todoCreateMutation.execute({
      body: values,
    })

    result.match(
      () => {
        toast.success({
          title: 'Success',
          description: 'Todo created successfully',
        })
        props.onSuccess?.()
      },
      (error) => {
        errorToast.show(error)
      },
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
const description = form.register('description')
const deadline = form.register('deadline')
</script>

<template>
  <FormLayout>
    <FormGrid :cols="1">
      <VcTextField
        v-bind="toFormField(title)"
        :label="i18n.t('module.todo.title_field')"
        :placeholder="i18n.t('module.todo.title_field')"
        required
      />

      <VcTextarea
        v-bind="toFormField(description)"
        :label="i18n.t('module.todo.description_field')"
        :placeholder="i18n.t('module.todo.description_field')"
        :rows="3"
      />

      <VcDateField
        v-bind="toFormField(deadline)"
        :label="i18n.t('module.todo.deadline_field')"
      />
    </FormGrid>

    <div class="mt-6 flex justify-end">
      <FormSubmitButton
        :form="form"
        :label="i18n.t('module.todo.create_button')"
        variant="primary"
      />
    </div>
  </FormLayout>
</template>
