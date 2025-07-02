<script setup lang="ts">
import type { FileInfo } from '@wisemen/vue-core-components'
import {
  VcFileUploadItem,
  VcFileUploadRoot,
  VcFileUploadTrigger,
  VcFormField,
  VcIcon,
} from '@wisemen/vue-core-components'
import { useId } from 'vue'

import { createFileV1 } from '@/client/sdk.gen'
import type { MimeType } from '@/client/types.gen'
import AppCard from '@/components/app/card/AppCard.vue'
import AppGroup from '@/components/app/group/AppGroup.vue'
import AppHeightTransition from '@/components/app/transition/AppHeightTransition.vue'
import type { S3FileForm } from '@/models/s3-file/s3FileForm.model.ts'

const props = withDefaults(defineProps<{
  id?: string | null
  isDisabled?: boolean
  isRequired?: boolean
  isTouched?: boolean
  display?: 'block' | 'inline'
  errors?: string[]
  hint?: string | null
  label?: string | null
  maxFileSizeMb?: number
  mimeTypes?: MimeType[]
  modelValue: S3FileForm | null
}>(), {
  id: null,
  isDisabled: false,
  isRequired: false,
  isTouched: false,
  display: 'inline',
  errors: () => [],
  hint: null,
  label: null,
  mimeTypes: () => [],
})

// const emit = defineEmits<{
//   'update:modelValue': [value: S3FileForm | null]
// }>()

// const modelValue = computed<FileInfo | null>({
//   get: (): FileInfo | null => {
//     if (props.modelValue === null) {
//       return null
//     }

//     return {
//       uuid: props.modelValue.uuid,
//       name: props.modelValue.url,
//       mimeType: props.modelValue.url,
//       order: 0,
//       url: props.modelValue.url,
//     }
//   },
//   set: (value: FileInfo | null): void => {
//     if (value === null) {
//       emit('update:modelValue', null)

//       return
//     }

//     const file: S3FileForm = {
//       uuid: value.uuid as S3FileUuid,
//       name: value.name,
//       url: value.url,
//     }

//     emit('update:modelValue', file)
//   },
// })

const inputId = props.id ?? useId()

async function getFileInfo(name: string, mimeType: string): Promise<FileInfo> {
  const response = await createFileV1({
    body: {
      name,
      mimeType: mimeType as MimeType,
    },
  })

  return {
    uuid: response.data.uuid,
    name: response.data.name,
    mimeType: response.data.mimeType!,
    order: 0,
    url: response.data.uploadUrl,
  }
}
</script>

<template>
  <VcFormField
    :for="inputId"
    :is-required="props.isRequired"
    :is-touched="props.isTouched"
    :error-message="props.errors[0]"
    :hint="props.hint"
    :label="props.label"
    class="w-full"
  >
    <VcFileUploadRoot
      v-slot="{ items }"
      :model-value="[]"
      :get-file-info="getFileInfo"
      :is-disabled="props.isDisabled"
      :accept="props.mimeTypes"
    >
      <AppHeightTransition class="w-full">
        <AppGroup
          direction="col"
          align="start"
          class="w-full"
        >
          <VcFileUploadTrigger
            v-if="items.length === 0"
            :class="{
              'h-52 !w-72': props.display === 'block',
            }"
            class="group"
          >
            <AppCard
              :variant="props.isDisabled ? 'disabled' : 'transparent'"
              :is-disabled="props.isDisabled"
              :class="{
                'flex size-full flex-col items-center justify-center': props.display === 'block',
              }"
              class="!border-dashed"
            >
              <VcIcon
                icon="plus"
                class="size-10 text-tertiary"
              />
            </AppCard>
          </VcFileUploadTrigger>

          <template v-if="props.display === 'inline'">
            <VcFileUploadItem
              v-for="file of items"
              :key="file.uuid"
              :item="file"
              :file="file"
            />
          </template>
          <template v-else>
            <VcFileUploadItem
              v-for="file of items"
              :key="file.uuid"
              :item="file"
              :file="file"
            />
          </template>
        </AppGroup>
      </AppHeightTransition>
    </VcFileUploadRoot>
  </VcFormField>
</template>
