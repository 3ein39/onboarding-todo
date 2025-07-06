<script setup lang="ts">
import {
  useVcToast,
  VcButton,
  VcDateField,
  VcDialog,
  VcFormField,
  VcIconButton,
  VcTextarea,
  VcTextField,
} from '@wisemen/vue-core-components'
import { useForm } from 'formango'
import { useI18n } from 'vue-i18n'

import { useApiErrorToast } from '@/composables/api-error-toast/apiErrorToast.composable'
import type { TodoCreateForm } from '@/models/todo/create/todoCreateForm.model'
import { todoCreateFormSchema } from '@/models/todo/create/todoCreateForm.model'
import { useTodoCreateMutation } from '@/modules/todo/api/mutations/todoCreate.mutation'
import { toFormField } from '@/utils/formango.util'

defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  close: []
  success: []
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
          title: i18n.t('module.todo.success.title'),
          description: i18n.t('module.todo.success.created'),
        })
        emit('success')
        emit('close')
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

function handleClose(): void {
  emit('close')
}
</script>

<template>
  <VcDialog
    :is-open="isOpen"
    :class-config="{
      overlay: 'bg-gray-950/25 backdrop-blur-none',
      content: 'shadow-sm shadow-brand-500/2',
    }"
    @close="handleClose"
  >
    <div
      class="
        flex max-h-[90vh] max-w-xl flex-col rounded-lg bg-white p-6
        sm:w-md
        md:w-lg
        lg:w-xl
      "
    >
      <div class="mb-6 flex items-center justify-between">
        <h2 class="text-2xl font-bold">
          {{ i18n.t('module.todo.create_todo') }}
        </h2>
        <VcIconButton
          :label="i18n.t('module.todo.close_dialog')"
          icon="close"
          variant="tertiary"
          @click="handleClose"
        />
      </div>

      <form
        class="space-y-6"
        @submit.prevent="form.submit()"
      >
        <div class="[&_label]:font-semibold">
          <VcFormField
            v-bind="toFormField(title)"
            :label="i18n.t('module.todo.title_field')"
            :is-required="true"
            :class-config="{
              error: 'hidden',
            }"
            for="title-input"
          >
            <VcTextField
              id="title-input"
              :placeholder="i18n.t('module.todo.title_field')"
              v-bind="toFormField(title)"
              :class-config="{
                input: 'bg-[var(--catskill-white)]',
              }"
            />
          </VcFormField>
        </div>

        <div class="[&_label]:font-semibold">
          <VcTextarea
            v-bind="toFormField(description)"
            :label="i18n.t('module.todo.description_field')"
            :placeholder="i18n.t('module.todo.description_field')"
            :rows="3"
            :class-config="{
              input: 'bg-[var(--catskill-white)]',
            }"
          />
        </div>

        <div class="[&_label]:font-semibold">
          <VcDateField
            v-bind="toFormField(deadline)"
            :label="i18n.t('module.todo.deadline_field')"
            :class-config="{
              root: 'bg-[var(--catskill-white)]',
            }"
          />
        </div>

        <div class="flex justify-end pt-4">
          <VcButton
            :is-loading="form.isSubmitting.value"

            :is-disabled="title.errors.value.length > 0"
            :class-config="{
              root: 'disabled:bg-[var(--shadow-blue)] w-full',
            }"
            type="submit"
            size="lg"
            variant="primary"
          >
            {{ i18n.t('module.todo.create_button') }}
          </VcButton>
        </div>
      </form>
    </div>
  </VcDialog>
</template>
