import { HttpResponse } from 'msw'

import { TEST_ID } from '@/constants/testId.constant'
import { PaginationUtil } from '@/utils/pagination.util'
import {
  expect,
  test,
} from '@@/base.fixture'
import { TodoIndexDtoBuilder } from '@@/utils/todoBuilder.util'

test.describe('Todo Listing', () => {
  test('should display multiple todos in the table', async ({
    http,
    page,
    worker,
  }) => {
    const TODO_1 = new TodoIndexDtoBuilder().build()
    const TODO_2 = new TodoIndexDtoBuilder()
      .withCompleted(true)
      .withDescription('Completed Todo')
      .build()
    const TODO_3 = new TodoIndexDtoBuilder()
      .withDeadline(new Date(2025, 11, 31))
      .withTitle('Todo with deadline')
      .build()

    await worker.use(
      http.get('*/api/v1/todos*', () => {
        return HttpResponse.json(PaginationUtil.getJson([
          TODO_1,
          TODO_2,
          TODO_3,
        ]))
      }),
    )
    await page.goto('/todos')

    const todoContainer = page.getByTestId(TEST_ID.TODOS.TABLE.CONTAINER)

    await expect(todoContainer).toBeVisible()

    const todoItems = page.getByTestId(TEST_ID.TODOS.TABLE.TITLE)

    await expect(todoItems).toHaveCount(3)

    await expect(todoItems.nth(0)).toContainText(TODO_1.title)
    await expect(todoItems.nth(1)).toContainText(TODO_2.title)
    await expect(todoItems.nth(2)).toContainText(TODO_3.title)

    const completedItems = page.getByRole('checkbox')

    await expect(completedItems.nth(1)).toBeChecked()
    await expect(completedItems.nth(0)).not.toBeChecked()
  })
})
