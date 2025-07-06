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
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import { useApiErrorToast } from '@/composables/api-error-toast/apiErrorToast.composable'
import { todoCreateFormSchema } from '@/models/todo/create/todoCreateForm.model'
import type { TodoIndex } from '@/models/todo/index/todoIndex.model'
import type { TodoUpdateForm } from '@/models/todo/update/todoUpdateForm.model'
import { useTodoCreateMutation } from '@/modules/todo/api/mutations/todoCreate.mutation'
import { useTodoDeleteMutation } from '@/modules/todo/api/mutations/todoDelete.mutation'
import { useTodoUpdateMutation } from '@/modules/todo/api/mutations/todoUpdate.mutation'
import { toFormField } from '@/utils/formango.util'

interface Props {
  isOpen: boolean
  todo?: TodoIndex
}

const props = defineProps<Props>()

const emit = defineEmits<{
  close: []
  success: []
}>()

const i18n = useI18n()
const toast = useVcToast()
const errorToast = useApiErrorToast()
const todoCreateMutation = useTodoCreateMutation()
const todoUpdateMutation = useTodoUpdateMutation()
const todoDeleteMutation = useTodoDeleteMutation()

const isUpdateMode = computed<boolean>(() => Boolean(props.todo))

const form = useForm({
  initialState: () => ({
    title: props.todo?.title || '',
    deadline: props.todo?.dueDate || null,
    description: props.todo?.description || null,
  }),
  schema: todoCreateFormSchema,
  onSubmit: async (values) => {
    if (isUpdateMode.value && props.todo) {
      const result = await todoUpdateMutation.execute({
        body: values as TodoUpdateForm,
        params: {
          todoUuid: props.todo.uuid,
        },
      })

      result.match(
        () => {
          toast.success({
            title: i18n.t('module.todo.success.title'),
            description: i18n.t('module.todo.success.updated'),
          })
          emit('success')
          emit('close')
        },
        (error) => {
          errorToast.show(error)
        },
      )
    }
    else {
      const result = await todoCreateMutation.execute({
        body: values as any,
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
    }
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

async function handleDelete(): Promise<void> {
  if (!props.todo) {
    return
  }

  const result = await todoDeleteMutation.execute({
    params: {
      todoUuid: props.todo.uuid,
    },
  })

  result.match(
    () => {
      toast.success({
        title: i18n.t('module.todo.success.title'),
        description: i18n.t('module.todo.success.deleted'),
      })
      emit('success')
      emit('close')
    },
    (error) => {
      errorToast.show(error)
    },
  )
}

const dialogTitle = computed<string>(() => {
  return isUpdateMode.value
    ? i18n.t('module.todo.update_title')
    : i18n.t('module.todo.create_title')
})

const submitButtonText = computed<string>(() => {
  return isUpdateMode.value
    ? i18n.t('module.todo.update_button')
    : i18n.t('module.todo.create_button')
})
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
          {{ dialogTitle }}
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

        <div class="flex justify-end gap-3 pt-4">
          <VcButton
            v-if="isUpdateMode"
            :is-loading="todoDeleteMutation.isLoading.value"
            :is-disabled="form.isSubmitting.value"
            type="button"
            size="lg"
            variant="destructive-tertiary"
            @click="handleDelete"
          >
            {{ i18n.t('module.todo.delete_button') }}
          </VcButton>

          <VcButton
            :is-loading="form.isSubmitting.value"
            :is-disabled="title.errors.value.length > 0"
            :class-config="{
              root: 'disabled:bg-[var(--shadow-blue)] flex-1',
            }"
            type="submit"
            size="lg"
            variant="primary"
          >
            {{ submitButtonText }}
          </VcButton>
        </div>
      </form>
    </div>
  </VcDialog>
</template>
