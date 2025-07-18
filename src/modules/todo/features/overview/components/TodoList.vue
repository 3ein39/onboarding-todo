<script setup lang="ts">
import {
  VcCheckbox,
  VcDropdownMenu,
  VcDropdownMenuGroup,
  VcDropdownMenuItem,
  VcIcon,
  VcIconButton,
} from '@wisemen/vue-core-components'
import {
  computed,
  type PropType,
} from 'vue'
import { useI18n } from 'vue-i18n'

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
  toggleComplete: [todo: TodoIndex]
}>()

const i18n = useI18n()

function formatDate(date: Date): string {
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

function onToggleComplete(todo: TodoIndex): void {
  emit('toggleComplete', todo)
}

const todoItems = computed<TodoIndex[]>(() => {
  return props.data || []
})
</script>

<template>
  <div
    :data-test-id="TEST_ID.TODOS.TABLE.CONTAINER"
    class="flex flex-col gap-md"
  >
    <div
      v-for="todo in todoItems"
      :key="todo.uuid"
      class="flex gap-4 rounded-3xl bg-secondary p-4"
    >
      <div
        :data-test-id="TEST_ID.TODOS.TABLE.COMPLETED"
      >
        <VcCheckbox
          :model-value="todo.isCompleted"
          :class-config="{
            control: 'size-6',
          }"
          @update:model-value="onToggleComplete(todo)"
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
              <VcIconButton
                :label="i18n.t('module.todo.todo_options')"
                :class-config="{
                  icon: 'flex items-center text-primary justify-center',
                }"
                icon="todoMenuDots"
                variant="tertiary"
                class="ml-auto"
              />
            </template>

            <template #content>
              <VcDropdownMenuGroup>
                <VcDropdownMenuItem
                  :label="i18n.t('module.todo.edit_todo')"
                  icon="edit"
                  @select="onEditTodo(todo)"
                />
                <hr class="mx-auto w-[90%] border-secondary">
                <VcDropdownMenuItem
                  :is-destructive="true"
                  :label="i18n.t('module.todo.delete_todo')"
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
          class="mb-2 text-sm font-medium text-secondary"
        >
          {{ todo.description }}
        </p>
        <div
          v-if="todo.dueDate"
          :data-test-id="TEST_ID.TODOS.TABLE.DUE_DATE"
          :class="todo.dueDate.getTime() < Date.now()
            ? 'text-error-primary'
            : 'text-secondary'"
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
      class="p-4 text-center text-tertiary"
    >
      {{ i18n.t('module.todo.loading') }}
    </div>

    <div
      v-else-if="todoItems.length === 0"
      class="p-4 text-center text-tertiary"
    >
      {{ i18n.t('module.todo.empty_state') }}
    </div>
  </div>
</template>
