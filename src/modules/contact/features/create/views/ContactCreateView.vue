<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import FormPage from '@/components/form/FormPage.vue'
import ContactCreateForm from '@/modules/contact/features/create/components/ContactCreateForm.vue'

const i18n = useI18n()
</script>

<template>
  <FormPage :title="i18n.t('module.contact.create.title')">
    <ContactCreateForm />
  </FormPage>
</template>
