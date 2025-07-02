<script setup lang="ts">
import type {
  PaginatedData,
  Pagination,
  TableColumn,
} from '@wisemen/vue-core-components'
import { VcTable } from '@wisemen/vue-core-components'
import type { VNode } from 'vue'
import {
  computed,
  h,
} from 'vue'
import { useI18n } from 'vue-i18n'

import AppTableActionCell from '@/components/app/table/AppTableActionCell.vue'
import { TEST_ID } from '@/constants/testId.constant.ts'
import type { UserIndex } from '@/models/user/index/userIndex.model.ts'
import type { UserIndexPagination } from '@/models/user/index/userIndexPagination.model.ts'
import UserOverviewTableRoleCell from '@/modules/settings/features/users/components/UserOverviewTableRoleCell.vue'
import UserOverviewTableUserInfoCell from '@/modules/settings/features/users/components/UserOverviewTableUserInfoCell.vue'

const props = defineProps<{
  isLoading: boolean
  data: PaginatedData<UserIndex> | null
  pagination: Pagination<UserIndexPagination>
}>()

const emit = defineEmits<{
  edit: [user: UserIndex]
}>()

const i18n = useI18n()

const columns = computed<TableColumn<UserIndex>[]>(() => [
  {
    testId: TEST_ID.USERS.OVERVIEW.TABLE.USER,
    cell: (user): VNode => h(UserOverviewTableUserInfoCell, {
      user,
    }),
    headerLabel: i18n.t('shared.users'),
    key: 'info',
  },
  {
    testId: TEST_ID.USERS.OVERVIEW.TABLE.ROLE,
    cell: (user): VNode => h(UserOverviewTableRoleCell, {
      user,
    }),
    headerLabel: i18n.t('shared.roles'),
    key: 'roles',
  },
  {
    testId: TEST_ID.USERS.OVERVIEW.TABLE.ACTION,
    cell: (user): VNode => h(AppTableActionCell, {
      icon: 'editPen',
      label: i18n.t('module.user.detail.edit_user'),
      size: 'sm',
      onClick: () => emit('edit', user),
    }),
    key: 'action',
  },
])
</script>

<template>
  <VcTable
    :columns="columns"
    :data="props.data"
    :data-test-id="TEST_ID.USERS.OVERVIEW.TABLE.CONTAINER"
    :is-first-column-sticky="true"
    :is-loading="props.isLoading"
    :class-config="{
      row: 'border-0 hover:bg-secondary',
      headerCell: 'bg-primary',
      root: 'border-0',
      cell: 'group-hover/row:bg-secondary',
    }"
    :pagination="props.pagination"
  />
</template>
