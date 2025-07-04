<script setup lang="ts">
import {
  VcDropdownMenu,
  VcDropdownMenuGroup,
  VcDropdownMenuItem,
  VcIcon,
} from '@wisemen/vue-core-components'
import {
  computed,
  type PropType,
} from 'vue'

import { TEST_ID } from '@/constants/testId.constant'
import type { TodoIndex } from '@/models/todo/index/todoIndex.model'
import type { TodoIndexPagination } from '@/models/todo/index/todoIndexPagination.model'

const props = defineProps({
  isLoading: {
    default: false,
    type: Boolean,
  },
  data: {
    required: true,
    type: Array as PropType<TodoIndex[]>,
  },
  pagination: {
    required: true,
    type: Object as PropType<TodoIndexPagination>,
  },
})

const emit = defineEmits<{
  deleteTodo: [todo: TodoIndex]
  editTodo: [todo: TodoIndex]
}>()

function formatDate(dateString: string): string {
  const date = new Date(dateString)

  return date.toLocaleDateString('nl-NL', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

function onEditTodo(todo: TodoIndex): void {
  emit('editTodo', todo)
}

function onDeleteTodo(todo: TodoIndex): void {
  emit('deleteTodo', todo)
}

const todoItems = computed<TodoIndex[]>(() => {
  return props.data || []
})
</script>

<template>
  <div
    :data-test-id="TEST_ID.TODOS.TABLE.CONTAINER"
    class="space-y-2"
  >
    <div
      v-for="todo in todoItems"
      :key="todo.uuid"
      class="flex gap-4 rounded-3xl bg-(--catskill-white) p-4"
    >
      <div
        :data-test-id="TEST_ID.TODOS.TABLE.COMPLETED"
      >
        <VcIcon
          :icon="todo.isCompleted ? 'todoChecked' : 'todoUnchecked'"
        />
      </div>
      <div class="flex-1">
        <div class="flex items-center gap-2">
          <h3
            :data-test-id="TEST_ID.TODOS.TABLE.TITLE"
            class="text-lg font-bold text-primary"
          >
            {{ todo.title }}
          </h3>
          <VcDropdownMenu
            :is-popover-arrow-hidden="true"
            :popover-side-offset="0"
            :class-config="{
              content: 'min-w-0',
            }"
            popover-align="end"
          >
            <template #trigger>
              <button
                type="button"
                class="
                  ml-auto p-1 text-gray-500
                  hover:cursor-pointer hover:text-gray-700
                "
              >
                <VcIcon
                  icon="todoMenuDots"
                />
              </button>
            </template>

            <template #content>
              <VcDropdownMenuGroup>
                <VcDropdownMenuItem
                  label="Bewerk to do"
                  icon="edit"
                  @select="onEditTodo(todo)"
                />
                <hr class="mx-auto w-[90%] border-(--periwinkel)">
                <VcDropdownMenuItem
                  :is-destructive="true"
                  label="Verwijder to do"
                  icon="trash"
                  @select="onDeleteTodo(todo)"
                />
              </VcDropdownMenuGroup>
            </template>
          </VcDropdownMenu>
        </div>
        <p
          v-if="todo.description"
          :data-test-id="TEST_ID.TODOS.TABLE.DESCRIPTION"
          class="mb-2 text-sm font-medium text-(--shadow-blue)"
        >
          {{ todo.description }}
        </p>
        <div
          v-if="todo.dueDate"
          :data-test-id="TEST_ID.TODOS.TABLE.DUE_DATE"
          :class="Date.parse(todo.dueDate) < Date.now()
            ? 'text-error-primary'
            : 'text-(--shadow-blue)'"
          class="flex items-center text-sm font-medium"
        >
          <VcIcon
            icon="todoCalendar"
            class="mr-1"
          />
          {{ formatDate(todo.dueDate) }}
        </div>
      </div>
    </div>

    <div
      v-if="isLoading"
      class="p-4 text-center text-gray-500"
    >
      Loading todos...
    </div>

    <div
      v-else-if="todoItems.length === 0"
      class="p-4 text-center text-gray-500"
    >
      No todos found. Create a new todo to get started.
    </div>
  </div>
</template>
