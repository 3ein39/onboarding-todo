<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import FormPage from '@/components/form/FormPage.vue'
import type { ContactDetail } from '@/models/contact/detail/contactDetail.model'
import ContactUpdateForm from '@/modules/contact/features/update/components/ContactUpdateForm.vue'

const props = defineProps<{
  contact: ContactDetail
}>()

const i18n = useI18n()
</script>

<template>
  <FormPage :title="i18n.t('module.contact.update.title')">
    <ContactUpdateForm :contact="props.contact" />
  </FormPage>
</template>
