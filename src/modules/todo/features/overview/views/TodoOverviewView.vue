<script setup lang="ts">
import {
  usePagination,
  useVcToast,
  VcButton,
  VcIcon,
} from '@wisemen/vue-core-components'
import {
  computed,
  ref,
} from 'vue'

import AppPage from '@/components/layout/AppPage.vue'
import TableErrorState from '@/components/table/TableErrorState.vue'
import { useApiErrorToast } from '@/composables/api-error-toast/apiErrorToast.composable'
import { useDocumentTitle } from '@/composables/document-title/documentTitle.composable'
import type { TodoIndex } from '@/models/todo/index/todoIndex.model'
import type { TodoIndexPagination } from '@/models/todo/index/todoIndexPagination.model'
import { useTodoDeleteMutation } from '@/modules/todo/api/mutations/todoDelete.mutation'
import { useTodoIndexQuery } from '@/modules/todo/api/queries/todoIndex.query'
import TodoDialog from '@/modules/todo/features/overview/components/TodoDialog.vue'
import TodoList from '@/modules/todo/features/overview/components/TodoList.vue'

const documentTitle = useDocumentTitle()

documentTitle.set('Mijn to do\'s')

const pagination = usePagination<TodoIndexPagination>({
  isRouteQueryEnabled: true,
  key: 'todoIndex',
})

const todoIndexQuery = useTodoIndexQuery(pagination.paginationOptions)
const todoDeleteMutation = useTodoDeleteMutation()
const toast = useVcToast()
const apiErrorToast = useApiErrorToast()

const isDialogOpen = ref<boolean>(false)
const selectedTodo = ref<TodoIndex | undefined>(undefined)

function openDialog(): void {
  selectedTodo.value = undefined
  isDialogOpen.value = true
}

function closeDialog(): void {
  isDialogOpen.value = false
  selectedTodo.value = undefined
}

function handleSuccess(): void {
  todoIndexQuery.refetch()
}

function handleEditTodo(todo: TodoIndex): void {
  selectedTodo.value = todo
  isDialogOpen.value = true
}

function handleDeleteTodo(todo: TodoIndex): void {
  todoDeleteMutation.execute({
    params: {
      todoUuid: todo.uuid,
    },
  }).then((result) => {
    result.match(
      () => {
        toast.success({
          title: 'Success',
          description: 'Todo deleted successfully',
        })
        todoIndexQuery.refetch()
      },
      (error) => {
        apiErrorToast.show(error)
      },
    )
  })
}

const isLoading = computed<boolean>(() => todoIndexQuery.isLoading.value)
const error = computed<unknown>(() => todoIndexQuery.error.value)
const paginationData = computed<TodoIndexPagination>(() => ({
  filter: pagination.paginationOptions.value.filter || {
    isCompleted: undefined,
  },
  sort: 'deadline',
}))
</script>

<template>
  <AppPage title="Mijn to do’s">
    <TableErrorState
      v-if="error"
      :error="error"
    />

    <TodoList
      v-else
      :is-loading="isLoading"
      :data="todoIndexQuery.data.value?.data || []"
      :pagination="paginationData"
      @edit-todo="handleEditTodo"
      @delete-todo="handleDeleteTodo"
    />

    <VcButton
      class="
        !fixed right-6 bottom-6 z-50 h-14 w-14 rounded-full shadow-lg
        transition-all duration-200
        hover:scale-105
      "
      variant="primary"
      data-test-id="create-todo-button"
      @click="openDialog"
    >
      <VcIcon
        icon="plus"
        size="lg"
      />
    </VcButton>

    <TodoDialog
      :is-open="isDialogOpen"
      :todo="selectedTodo"
      @close="closeDialog"
      @success="handleSuccess"
    />
  </AppPage>
</template>
