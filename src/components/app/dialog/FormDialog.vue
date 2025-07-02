<script setup lang="ts" generic="T extends ZodObject<ZodRawShape>">
import { VcDialog } from '@wisemen/vue-core-components'
import type { Form } from 'formango'
import type {
  ZodObject,
  ZodRawShape,
} from 'zod'

import AppSeparator from '@/components/app/AppSeparator.vue'
import AppDialogActions from '@/components/app/dialog/AppDialogActions.vue'
import AppDialogContent from '@/components/app/dialog/AppDialogContent.vue'
import AppDialogHeader from '@/components/app/dialog/AppDialogHeader.vue'
import AppForm from '@/components/form/AppForm.vue'

const props = defineProps<{
  teleportTargetId?: string
  title?: string
  description?: string
  form: Form<T>
}>()

const emit = defineEmits<{
  close: []
}>()

function onClose(): void {
  emit('close')
}
</script>

<template>
  <VcDialog
    :teleport-target-id="props.teleportTargetId"
    :class-config="{
      overlay: 'bg-gray-950/25 backdrop-blur-none',
      content: 'shadow-sm shadow-brand-500/2',
    }"
    is-open
    @close="onClose"
  >
    <AppDialogContent
      :content-title="props.title"
      :content-description="props.description"
      class="flex max-h-[90vh] max-w-lg flex-col"
    >
      <div class="flex items-center gap-xl">
        <slot name="header">
          <AppDialogHeader
            :title="props.title"
            :description="props.description"
          />
        </slot>
      </div>

      <div
        class="-mx-lg flex flex-grow flex-col overflow-y-auto px-lg pt-4xl"
      >
        <AppForm
          :form="props.form"
          :can-exit-when-dirty="true"
        >
          <slot name="form" />

          <div class="col-span-2 mt-4xl">
            <AppSeparator />

            <AppDialogActions>
              <slot name="actions" />
            </AppDialogActions>
          </div>
        </AppForm>
      </div>
    </AppDialogContent>
  </VcDialog>
</template>
