<script setup lang="ts">
import { usePagination } from '@wisemen/vue-core-components'
import { computed } from 'vue'

import AppPage from '@/components/layout/AppPage.vue'
import TableActionsLayout from '@/components/table/TableActionsLayout.vue'
import TableErrorState from '@/components/table/TableErrorState.vue'
import { useDocumentTitle } from '@/composables/document-title/documentTitle.composable'
import type { TodoIndexPagination } from '@/models/todo/index/todoIndexPagination.model'
import { useTodoIndexQuery } from '@/modules/todo/api/queries/todoIndex.query'
// import TodoList from '@/modules/todo/features/overview/components/TodoList.vue'

const documentTitle = useDocumentTitle()

documentTitle.set('Mijn to do’s')

const pagination = usePagination<TodoIndexPagination>({
  isRouteQueryEnabled: true,
  key: 'todoIndex',
})

const todoIndexQuery = useTodoIndexQuery(pagination.paginationOptions)

// const isLoading = computed<boolean>(() => todoIndexQuery.isLoading.value)
const error = computed<unknown>(() => todoIndexQuery.error.value)
</script>

<template>
  <AppPage title="Mijn to do’s">
    <template #actions>
      <!-- Add create button if needed -->
    </template>
    <TableActionsLayout>
      <!-- Search field removed as it requires isLoading prop -->
    </TableActionsLayout>

    <TableErrorState
      v-if="error"
      :error="error"
    />

    <!-- <TodoList
      v-else
      :is-loading="isLoading"
      :data="todoIndexQuery.data.value"
      :pagination="pagination"
    /> -->
    <div v-else>
      {{ todoIndexQuery.data.value }}
    </div>
  </AppPage>
</template>
