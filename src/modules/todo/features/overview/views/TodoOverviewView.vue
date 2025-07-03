<script setup lang="ts">
import { usePagination } from '@wisemen/vue-core-components'
import {
  computed,
  ref,
} from 'vue'

import AppPage from '@/components/layout/AppPage.vue'
import TableActionsLayout from '@/components/table/TableActionsLayout.vue'
import TableErrorState from '@/components/table/TableErrorState.vue'
import { useDocumentTitle } from '@/composables/document-title/documentTitle.composable'
import type { TodoIndex } from '@/models/todo/index/todoIndex.model'
import type { TodoIndexPagination } from '@/models/todo/index/todoIndexPagination.model'
import { todoUuidSchema } from '@/models/todo/todoUuid.model'
import { useTodoIndexQuery } from '@/modules/todo/api/queries/todoIndex.query'
import TodoList from '@/modules/todo/features/overview/components/TodoList.vue'

const documentTitle = useDocumentTitle()

documentTitle.set('Mijn to do\'s')

const pagination = usePagination<TodoIndexPagination>({
  isRouteQueryEnabled: true,
  key: 'todoIndex',
})

const todoIndexQuery = useTodoIndexQuery(pagination.paginationOptions)

// Mock data for development and testing
const mockTodos = ref<TodoIndex[]>([
  {
    uuid: todoUuidSchema.parse('1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'),
    title: 'Complete project documentation',
    createdAt: '2025-06-30T10:00:00Z',
    dueDate: '2025-07-05T18:00:00Z',
    updatedAt: '2025-06-30T10:00:00Z',
    isCompleted: false,
    description: 'Write comprehensive documentation for the Vue project template',
  },
  {
    uuid: todoUuidSchema.parse('9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'),
    title: 'Review pull requests',
    createdAt: '2025-06-29T14:30:00Z',
    dueDate: '2025-07-01T17:00:00Z',
    updatedAt: '2025-06-29T15:45:00Z',
    isCompleted: true,
    description: 'Review and merge pending pull requests from the team',
  },
  {
    uuid: todoUuidSchema.parse('6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b'),
    title: 'Fix responsive layout issues',
    createdAt: '2025-07-01T09:15:00Z',
    dueDate: '2025-07-02T16:00:00Z',
    updatedAt: '2025-07-01T11:30:00Z',
    isCompleted: false,
    description: 'Address the layout problems on mobile devices',
  },
  {
    uuid: todoUuidSchema.parse('8f8e4463-bc38-4ea3-bf4a-5c12ab49a562'),
    title: 'Update dependencies',
    createdAt: '2025-06-28T16:20:00Z',
    dueDate: '2025-07-04T12:00:00Z',
    updatedAt: '2025-06-28T16:20:00Z',
    isCompleted: false,
    description: null,
  },
  {
    uuid: todoUuidSchema.parse('2fd4e1c6-7a64-4295-bbd6-7bb9bd40fd5f'),
    title: 'Write unit tests',
    createdAt: '2025-07-02T08:00:00Z',
    dueDate: null,
    updatedAt: '2025-07-02T13:45:00Z',
    isCompleted: false,
    description: 'Increase test coverage for critical components',
  },
])

const isLoading = computed<boolean>(() => todoIndexQuery.isLoading.value)
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

    <TodoList
      v-else
      :is-loading="isLoading"
      :data="mockTodos"
      :pagination="pagination"
    />
    <!-- <div v-else>
      {{ todoIndexQuery.data.value }}
    </div> -->
  </AppPage>
</template>
