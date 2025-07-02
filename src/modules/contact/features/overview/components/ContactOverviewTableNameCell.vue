<script setup lang="ts">
import {
  VcAvatar,
  VcTableCell,
} from '@wisemen/vue-core-components'

import AppGroup from '@/components/app/group/AppGroup.vue'
import { TEST_ID } from '@/constants/testId.constant'
import type { ContactIndex } from '@/models/contact/index/contactIndex.model'

const props = defineProps<{
  contact: ContactIndex
}>()
</script>

<template>
  <VcTableCell
    :is-primary-cell="true"
    :data-test-id="TEST_ID.CONTACTS.TABLE.NAME_LINK"
  >
    <AppGroup gap="lg">
      <VcAvatar
        :name="props.contact.name ?? '-'"
        :class-config="{
          root: 'size-9',
          fallback: 'text-xs font-semibold',
        }"
      />

      {{ props.contact.name ?? '-' }}
    </AppGroup>
  </VcTableCell>
</template>
