<script setup lang="ts">
import { VcTableCell } from '@wisemen/vue-core-components'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import type { ContactIndex } from '@/models/contact/index/contactIndex.model'

const props = defineProps<{
  contact: ContactIndex
}>()

const i18n = useI18n()

const statusLabel = computed<string>(() => {
  if (props.contact.isActive) {
    return i18n.t('module.contact.status.active')
  }

  return i18n.t('module.contact.status.inactive')
})
</script>

<template>
  <VcTableCell data-test-id="contact-status">
    {{ statusLabel }}
  </VcTableCell>
</template>
