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

import AppErrorState from '@/components/app/error-state/AppErrorState.vue'
import AppTableTextCell from '@/components/app/table/AppTableTextCell.vue'
import { useLocalizedDateFormat } from '@/composables/localized-date-format/localizedDateFormat.composable.ts'
import SettingsEventLogIndexTableContentCell from '@/modules/settings/features/event-logs/components/SettingsEventLogIndexTableContentCell.vue'
import type { SettingsEventLogIndex } from '@/modules/settings/models/event-log/settingsEventLogIndex.model.ts'
import type { SettingsEventLogIndexPagination } from '@/modules/settings/models/event-log/settingsEventLogIndexPagination.model.ts'
import { ApiErrorUtil } from '@/utils/apiError.util'

const props = defineProps<{
  isFetching: boolean
  isLoading: boolean
  data: PaginatedData<SettingsEventLogIndex> | null
  error: unknown | null
  pagination: Pagination<SettingsEventLogIndexPagination>
  onNext: () => Promise<void>
}>()

const i18n = useI18n()

const dateFormatter = useLocalizedDateFormat()

const columns = computed<TableColumn<SettingsEventLogIndex>[]>(() => [
  {
    cell: (eventLog): VNode => h(SettingsEventLogIndexTableContentCell, {
      content: eventLog.content,
    }),
    headerLabel: i18n.t('shared.info'),
    key: 'content',
    width: '5rem',
  },
  {
    cell: (eventLog): VNode => h(AppTableTextCell, {
      value: eventLog.message,
    }),
    headerLabel: i18n.t('shared.message'),
    key: 'message',
    width: '20rem',
  },
  {
    cell: (eventLog): VNode => h(AppTableTextCell, {
      value: dateFormatter.toDateTime(eventLog.createdAt),
    }),
    headerLabel: i18n.t('shared.created_at'),
    key: 'createdAt',
    width: '12rem',
  },
  {
    cell: (eventLog): VNode => h(AppTableTextCell, {
      value: eventLog.uuid,
    }),
    headerLabel: i18n.t('shared.id'),
    key: 'uuid',
    width: '24rem',
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
    @next-page="onNextPage"
  />
</template>
