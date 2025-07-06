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
          items: [],
          meta: {
            limit: 10,
            offset: 0,
            total: 0,
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
    await expect(page.locator('text="No todos found. Create a new todo to get started."')).toBeVisible({
      timeout: 10_000,
    })
  })
})
