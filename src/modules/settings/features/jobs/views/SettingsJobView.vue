<script setup lang="ts">
import {
  usePagination,
  VcSelect,
  VcSelectItem,
  VcSwitch,
} from '@wisemen/vue-core-components'
import { useI18n } from 'vue-i18n'

import { QueueName } from '@/client'
import { useSettingsJobsIndexQuery } from '@/modules/settings/api/queries/settingsJobsIndex.query.ts'
import SettingsJobsIndexTable from '@/modules/settings/features/jobs/components/SettingsJobIndexTable.vue'
import type { SettingsJobIndexPagination } from '@/modules/settings/models/jobs/settingsJobIndexPagination.model.ts'

const i18n = useI18n()

const pagination = usePagination<SettingsJobIndexPagination>({
  isRouteQueryEnabled: false,
  type: 'keyset',
})

const indexQuery = useSettingsJobsIndexQuery(pagination.paginationOptions)

async function onNext(): Promise<void> {
  await indexQuery.getNextPage()
}

function onUpdateFilter(value: QueueName[]): void {
  pagination.handleFilterChange({
    queueNames: value,
  })
}

function onUpdateIsArchivedFilter(value: boolean): void {
  pagination.handleFilterChange({
    archived: value,
  })
}
</script>

<template>
  <div class="flex h-full flex-col">
    <div class="flex items-center justify-between gap-lg p-sm px-lg">
      <VcSelect
        :model-value="pagination.paginationOptions.value.filter?.queueNames ?? []"
        :display-fn="(name) => name"
        :placeholder="i18n.t('module.settings.jobs.table.queue_name')"
        label=""
        class="w-50"
        @update:model-value="onUpdateFilter"
      >
        <VcSelectItem
          v-for="name of QueueName"
          :key="name"
          :value="name"
        >
          {{ name }}
        </VcSelectItem>
      </VcSelect>
      <VcSwitch
        :model-value="pagination.paginationOptions.value.filter?.archived ?? false"
        :label="i18n.t('module.settings.jobs.table.archived')"
        @update:model-value="onUpdateIsArchivedFilter"
      />
    </div>
    <SettingsJobsIndexTable
      :is-loading="indexQuery.isLoading.value"
      :pagination="pagination"
      :data="indexQuery.data.value"
      :on-next="onNext"
      :error="indexQuery.error.value"
      :is-fetching="indexQuery.isFetching.value"
    />
  </div>
</template>
