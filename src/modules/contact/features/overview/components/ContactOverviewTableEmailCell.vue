<script setup lang="ts">
import { VcTableCell } from '@wisemen/vue-core-components'

import { TEST_ID } from '@/constants/testId.constant'
import type { ContactIndex } from '@/models/contact/index/contactIndex.model'

const props = defineProps<{
  contact: ContactIndex
}>()
</script>

<template>
  <VcTableCell :data-test-id="TEST_ID.CONTACTS.TABLE.EMAIL_LINK">
    {{ props.contact.email ?? '-' }}
  </VcTableCell>
</template>
