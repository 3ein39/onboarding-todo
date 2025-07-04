import { HttpResponse } from 'msw'

import { TEST_ID } from '@/constants/testId.constant'
import {
  expect,
  test,
} from '@@/base.fixture'

test.describe('Todo Basic Functionality', () => {
  test('should be able to access todo page when authenticated', async ({
    http,
    page,
    worker,
  }) => {
    // Mock empty todo list
    await worker.use(
      http.get('*/api/v1/todos*', () => {
        return HttpResponse.json({
          data: [],
          meta: {
            currentPage: 1,
            itemsPerPage: 10,
            totalItems: 0,
            totalPages: 1,
          },
        })
      }),
    )

    await page.goto('/todos')

    // Wait for the page to load
    await page.waitForLoadState()

    // Check if we can see the todo container
    await expect(page.getByTestId(TEST_ID.TODOS.TABLE.CONTAINER)).toBeVisible()

    // Should show empty state when no todos
    await expect(page.getByText('No todos found. Create a new todo to get started.')).toBeVisible()
  })
})
