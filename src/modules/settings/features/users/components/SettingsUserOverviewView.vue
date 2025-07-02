<script setup lang="ts">
import {
  usePagination,
  useVcDialog,
} from '@wisemen/vue-core-components'
import { computed } from 'vue'

import AppErrorState from '@/components/app/error-state/AppErrorState.vue'
import AppTeleport from '@/components/app/teleport/AppTeleport.vue'
import PaginationSearchField from '@/components/pagination/PaginationSearchField.vue'
import type { UserIndex } from '@/models/user/index/userIndex.model.ts'
import type { UserIndexPagination } from '@/models/user/index/userIndexPagination.model.ts'
import { useSettingsUserIndexQuery } from '@/modules/settings/features/users/api/queries/settingsUserIndex.query.ts'
import SettingsUserOverviewTable from '@/modules/settings/features/users/components/SettingsUserOverviewTable.vue'
import { ApiErrorUtil } from '@/utils/apiError.util'

const pagination = usePagination<UserIndexPagination>({
  isRouteQueryEnabled: true,
  key: 'users',
})

const userIndexQuery = useSettingsUserIndexQuery(pagination.paginationOptions)

const userDetailDialog = useVcDialog({
  component: () => import('@/modules/settings/features/users/dialogs/SettingsUserUpdateDialog.vue'),
})

function onEditUser(user: UserIndex): void {
  userDetailDialog.open({
    userUuid: user.uuid,
  })
}

const isLoading = computed<boolean>(() => userIndexQuery.isLoading.value)
const error = computed<unknown>(() => userIndexQuery.error.value)
</script>

<template>
  <div>
    <AppTeleport to="settingsActions">
      <PaginationSearchField
        :is-loading="userIndexQuery.isFetching.value"
        :pagination="pagination"
      />
    </AppTeleport>

    <AppErrorState
      v-if="ApiErrorUtil.isError(error)"
      :error="error"
    />

    <SettingsUserOverviewTable
      v-else
      :data="userIndexQuery.data.value"
      :is-loading="isLoading"
      :pagination="pagination"
      :error="userIndexQuery.error.value"
      @edit="onEditUser"
    />
  </div>
</template>
