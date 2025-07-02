<script setup lang="ts">
import { usePagination } from '@wisemen/vue-core-components'

import { useSettingsEventLogIndexQuery } from '@/modules/settings/api/queries/settingsEventLogIndex.query.ts'
import SettingsEventLogIndexTable from '@/modules/settings/features/event-logs/components/SettingsEventLogIndexTable.vue'
import type { SettingsEventLogIndexPagination } from '@/modules/settings/models/event-log/settingsEventLogIndexPagination.model.ts'

const pagination = usePagination<SettingsEventLogIndexPagination>({
  isRouteQueryEnabled: false,
  type: 'keyset',
})

const indexQuery = useSettingsEventLogIndexQuery(pagination.paginationOptions)

async function onNext(): Promise<void> {
  await indexQuery.getNextPage()
}
</script>

<template>
  <div class="flex h-full flex-1 flex-col">
    <SettingsEventLogIndexTable
      :is-loading="indexQuery.isLoading.value"
      :pagination="pagination"
      :data="indexQuery.data.value"
      :on-next="onNext"
      :error="indexQuery.error.value"
      :is-fetching="indexQuery.isFetching.value"
    />
  </div>
</template>
