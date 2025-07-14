import { HttpResponse } from 'msw'

import { TEST_ID } from '@/constants/testId.constant'
import { PaginationUtil } from '@/utils/pagination.util'
import {
  expect,
  test,
} from '@@/base.fixture'
import { TodoIndexDtoBuilder } from '@@/utils/todoBuilder.util'

test.describe('Todo Deletion', () => {
  test('should delete a todo successfully', async ({
    http,
    page,
    worker,
  }) => {
    const TODO_1 = new TodoIndexDtoBuilder()
      .withTitle('Todo to Delete')
      .withDescription('This will be deleted')
      .build()
    const TODO_2 = new TodoIndexDtoBuilder()
      .withTitle('Todo to Keep')
      .withDescription('This will remain')
      .build()

    let getTodosCallCount = 0

    await worker.use(
      http.get('/api/v1/todos', () => {
        getTodosCallCount += 1

        if (getTodosCallCount > 1) {
          // After deletion, return only the second todo
          return HttpResponse.json(PaginationUtil.getJson([
            TODO_2,
          ]))
        }

        // Initially return both todos
        return HttpResponse.json(PaginationUtil.getJson([
          TODO_1,
          TODO_2,
        ]))
      }),
    )

    await worker.use(
      http.delete(`/api/v1/todos/${TODO_1.uuid}`, () => {
        return HttpResponse.json({}, {
          status: 204,
        })
      }),
    )

    await page.goto('/todos')

    await expect(page.getByTestId(TEST_ID.TODOS.TABLE.CONTAINER)).toBeVisible()

    // Verify both todos are initially present
    const todoItems = page.getByTestId(TEST_ID.TODOS.TABLE.TITLE)

    await expect(todoItems).toHaveCount(2)
    await expect(todoItems.nth(0)).toContainText(TODO_1.title)
    await expect(todoItems.nth(1)).toContainText(TODO_2.title)

    // Click on the first todo's dropdown menu (the one to delete)
    await page.getByTestId(TEST_ID.TODOS.TABLE.MENU_BUTTON).first().click()

    // Click delete option
    await page.getByTestId(TEST_ID.TODOS.DELETE.MENU_ITEM).click()

    // Check for success message
    await expect(page.getByText('Todo deleted successfully')).toBeVisible()

    // Verify the todo list is updated and only contains the remaining todo
    await expect(page.getByTestId(TEST_ID.TODOS.TABLE.CONTAINER)).toBeVisible()

    const remainingTodoItems = page.getByTestId(TEST_ID.TODOS.TABLE.TITLE)

    await expect(remainingTodoItems).toHaveCount(1)
    await expect(remainingTodoItems.nth(0)).toContainText(TODO_2.title)
    await expect(remainingTodoItems.nth(0)).not.toContainText(TODO_1.title)
  })
})
