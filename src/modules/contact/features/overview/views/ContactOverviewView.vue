<script setup lang="ts">
import {
  usePagination,
  VcRouterLinkButton,
} from '@wisemen/vue-core-components'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import { Permission } from '@/client'
import AppPage from '@/components/layout/AppPage.vue'
import PaginationSearchField from '@/components/pagination/PaginationSearchField.vue'
import TableActionsLayout from '@/components/table/TableActionsLayout.vue'
import TableErrorState from '@/components/table/TableErrorState.vue'
import { useDocumentTitle } from '@/composables/document-title/documentTitle.composable'
import { TEST_ID } from '@/constants/testId.constant.ts'
import type { ContactIndexPagination } from '@/models/contact/index/contactIndexPagination.model'
import { useContactIndexQuery } from '@/modules/contact/api/queries/contactIndex.query'
import ContactOverviewTable from '@/modules/contact/features/overview/components/ContactOverviewTable.vue'
import { useAuthStore } from '@/stores/auth.store'

const i18n = useI18n()
const authStore = useAuthStore()

const documentTitle = useDocumentTitle()

documentTitle.set(i18n.t('module.contact.label.plural'))

const pagination = usePagination<ContactIndexPagination>({
  isRouteQueryEnabled: true,
  key: 'contactIndex',
})

const contactIndexQuery = useContactIndexQuery(pagination.paginationOptions)

const isLoading = computed<boolean>(() => contactIndexQuery.isLoading.value)
const error = computed<unknown>(() => contactIndexQuery.error.value)
const isCreateButtonVisible = computed<boolean>(() => authStore.hasPermission(Permission.CONTACT_CREATE))
</script>

<template>
  <AppPage :title="i18n.t('module.contact.label.plural')">
    <template #actions>
      <VcRouterLinkButton
        v-if="isCreateButtonVisible"
        :to="{ name: 'contact-create' }"
        :test-id="TEST_ID.CONTACTS.OVERVIEW.CREATE_BUTTON"
        color="primary"
        icon-left="plus"
      >
        {{ i18n.t('module.contact.create') }}
      </VcRouterLinkButton>
    </template>

    <template #default>
      <TableActionsLayout>
        <template #right>
          <PaginationSearchField
            :is-loading="contactIndexQuery.isLoading.value"
            :pagination="pagination"
          />
        </template>
      </TableActionsLayout>

      <TableErrorState
        v-if="error !== null"
        :error="error"
      />

      <ContactOverviewTable
        v-else
        :data="contactIndexQuery.data.value"
        :is-loading="isLoading"
        :pagination="pagination"
      />
    </template>
  </AppPage>
</template>
