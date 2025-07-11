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

test.describe('Todo Creation', () => {
  test('should close create dialog when cancel or escape', async ({
    http,
    page,
    worker,
  }) => {
    await worker.use(
      http.get('*/api/v1/todos*', () => {
        return HttpResponse.json(PaginationUtil.getJson([]))
      }),
    )

    await page.goto('/todos')

    await expect(page.getByTestId(TEST_ID.TODOS.TABLE.CONTAINER)).toBeVisible()

    await page.getByTestId(TEST_ID.TODOS.OVERVIEW.CREATE_BUTTON).click()

    await expect(page.getByRole('dialog')).toBeVisible()

    await page.keyboard.press('Escape')

    await expect(page.getByRole('dialog')).toBeHidden()

    await page.getByTestId(TEST_ID.TODOS.OVERVIEW.CREATE_BUTTON).click()

    await page.getByRole('button', {
      name: /close/i,
    }).click()

    await expect(page.getByRole('dialog')).toBeHidden()
  })
  test('should create a new todo', async ({
    http,
    page,
    worker,
  }) => {
    const NEW_TODO = new TodoIndexDtoBuilder()
      .withTitle('New Todo')
      .withDescription('Some Description')
      .build()

    let getTodosCallCount = 0

    await worker.use(
      http.get('/api/v1/todos', () => {
        getTodosCallCount += 1

        if (getTodosCallCount > 1) {
          return HttpResponse.json(PaginationUtil.getJson([
            NEW_TODO,
          ]))
        }

        return HttpResponse.json(PaginationUtil.getJson([]))
      }),
    )
    await worker.use(
      http.post('/api/v1/todos', () => {
        return HttpResponse.json({
          uuid: NEW_TODO.uuid,
        }, {
          status: 201,
        })
      }),
    )
    await page.goto('/todos')
    await expect(page.getByTestId(TEST_ID.TODOS.TABLE.CONTAINER)).toBeVisible()
    await page.getByTestId(TEST_ID.TODOS.OVERVIEW.CREATE_BUTTON).click()
    await expect(page.getByRole('dialog')).toBeVisible()
    await page.getByRole('textbox', {
      name: 'Title *',
    }).click()
    await page.getByRole('textbox', {
      name: 'Title ',
    }).fill('New Todo')
    await page.getByRole('textbox', {
      name: 'Description',
    }).click()
    await page.getByRole('textbox', {
      name: 'Description',
    }).fill('Some Description')

    await page.getByTestId('todos-create-submit-button').click()

    await expect(page.getByText('Todo created successfully')).toBeVisible()

    await expect(page.getByTestId(TEST_ID.TODOS.TABLE.CONTAINER)).toBeVisible()

    const todoItems = page.getByTestId(TEST_ID.TODOS.TABLE.TITLE)

    await expect(todoItems).toHaveCount(1)
    await expect(todoItems.nth(0)).toContainText(NEW_TODO.title)
  })
})
