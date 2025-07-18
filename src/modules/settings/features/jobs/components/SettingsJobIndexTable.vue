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

import { ViewJobsIndexSortQueryKey } from '@/client'
import AppErrorState from '@/components/app/error-state/AppErrorState.vue'
import AppTableTextCell from '@/components/app/table/AppTableTextCell.vue'
import { useLocalizedDateFormat } from '@/composables/localized-date-format/localizedDateFormat.composable.ts'
import SettingsJobsIndexTableContentCell from '@/modules/settings/features/jobs/components/SettingsJobIndexTableContentCell.vue'
import type { SettingsJobIndex } from '@/modules/settings/models/jobs/settingsJobIndexDto.model.ts'
import type { SettingsJobIndexPagination } from '@/modules/settings/models/jobs/settingsJobIndexPagination.model.ts'
import { ApiErrorUtil } from '@/utils/apiError.util'

const props = defineProps<{
  isFetching: boolean
  isLoading: boolean
  data: PaginatedData<SettingsJobIndex> | null
  error: unknown | null
  pagination: Pagination<SettingsJobIndexPagination>
  onNext: () => Promise<void>
}>()

const i18n = useI18n()

const columns = computed<TableColumn<SettingsJobIndex>[]>(() => [
  {
    cell: (eventLog): VNode => h(SettingsJobsIndexTableContentCell, {
      value: eventLog.name,
    }),
    headerLabel: i18n.t('shared.info'),
    key: 'content',
    width: '4rem',
  },
  {
    cell: (eventLog): VNode => h(AppTableTextCell, {
      value: eventLog.name,
    }),
    headerLabel: i18n.t('module.settings.jobs.table.job_name'),
    key: 'type',
    width: '15rem',
  },
  {
    cell: (eventLog): VNode => h(AppTableTextCell, {
      value: eventLog.queueName,
    }),
    headerLabel: i18n.t('module.settings.jobs.table.queue_name'),
    key: 'type',
    width: '10rem',
  },
  {
    cell: (eventLog): VNode => h(AppTableTextCell, {
      value: eventLog.status,
    }),
    headerLabel: i18n.t('module.settings.jobs.table.status'),
    key: 'type',
    width: '10rem',
  },
  {
    isSortable: true,
    cell:
        (eventLog): VNode =>
          h(AppTableTextCell, {
            value:
                eventLog.createdAt ? useLocalizedDateFormat().toNumericDate(eventLog.createdAt) : '-',
          }),
    headerLabel: i18n.t('module.settings.jobs.table.created_at'),
    key: ViewJobsIndexSortQueryKey.CREATED_AT,
    width: '10rem',
  },
  {
    cell:
        (eventLog): VNode =>
          h(AppTableTextCell, {
            value:
                eventLog.completedAt ? useLocalizedDateFormat().toNumericDate(eventLog.completedAt) : '-',
          }),
    headerLabel: i18n.t('module.settings.jobs.table.completed_at'),
    key: 'type',
    width: '10rem',
  },
  {
    cell: (eventLog): VNode => h(AppTableTextCell, {
      value: eventLog.id,
    }),
    headerLabel: i18n.t('module.settings.jobs.table.job_id'),
    key: 'type',
    width: '20rem',
  },
])

async function onNextPage(): Promise<void> {
  await props.onNext()
}
</script>

<template>
  <AppErrorState
    v-if="props.error !== null && ApiErrorUtil.isError(props.error)"
    :error="props.error"
  />
  <VcTable
    v-else
    :columns="columns"
    :data="props.data"
    :class-config="{
      row: 'border-0 hover:bg-secondary',
      headerCell: 'bg-primary',
      root: 'border-0',
      cell: 'group-hover/row:bg-secondary',
    }"
    :row-class="() => '!border-b-secondary'"
    :is-first-column-sticky="true"
    :is-loading="props.isLoading"
    :pagination="props.pagination"
    :row-action="{
      type: 'button',
      label: () => i18n.t('module.settings.jobs.table.view'),
      onClick: (row) => { console.log(row) },
    }"
    @next-page="onNextPage"
  />
</template>
