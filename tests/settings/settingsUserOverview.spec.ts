import { HttpResponse } from 'msw'

import { TEST_ID } from '@/constants/testId.constant.ts'
import { getPaginatedJson } from '@/mocks/handlers/user.mock.ts'
import { UserDetailDtoBuilder } from '@/models/user/detail/userDetailDto.builder.ts'
import { UserIndexDtoBuilder } from '@/models/user/index/userIndexDto.builder.ts'
import type { UserUuid } from '@/models/user/userUuid.model.ts'
import { UuidUtil } from '@/utils/uuid.util.ts'
import {
  expect,
  test,
} from '@@/base.fixture'

test.describe('User Overview Table', () => {
  test.skip('should display users with their information and roles correctly', async ({
    page,
  }) => {
    await page.goto('/contacts')
    await page.getByTestId(TEST_ID.SETTINGS.OPEN_DIALOG_BUTTON).click()
    await expect(page.getByTestId(TEST_ID.SETTINGS.DIALOG)).toBeVisible()
    await page.getByTestId(TEST_ID.SETTINGS.SIDEBAR.USER_BUTTON).click()

    const tableContainer = page.getByTestId(TEST_ID.USERS.OVERVIEW.TABLE.CONTAINER)

    await expect(tableContainer).toBeVisible()
    await expect(tableContainer.locator('[aria-busy="true"]')).toBeHidden()

    await expect(page.getByTestId(TEST_ID.USERS.OVERVIEW.TABLE.USER).first()).toBeVisible()
    await expect(page.getByTestId(TEST_ID.USERS.OVERVIEW.TABLE.NAME).first()).toContainText('John Doe')
    await expect(page.getByTestId(TEST_ID.USERS.OVERVIEW.TABLE.EMAIL).first()).toContainText('John.doe@gmail.com')
    await expect(page.getByTestId(TEST_ID.USERS.OVERVIEW.TABLE.ROLE).first()).toContainText('Admin')

    await expect(page.getByTestId(TEST_ID.USERS.OVERVIEW.TABLE.USER).nth(1)).toBeVisible()
    await expect(page.getByTestId(TEST_ID.USERS.OVERVIEW.TABLE.NAME).nth(1)).toContainText('Sylvia Sterling')
    await expect(page.getByTestId(TEST_ID.USERS.OVERVIEW.TABLE.EMAIL).nth(1)).toContainText('Sylvia.sterling@gmail.com')
    await expect(page.getByTestId(TEST_ID.USERS.OVERVIEW.TABLE.ROLE).nth(2)).toContainText('Marketing')
  })
})

test.describe('User update role modal', () => {
  test.skip('should display the user update modal and let you update the roles', async ({
    http,
    page,
    worker,
  }) => {
    const USER_UUID = UuidUtil.getRandom<UserUuid>()

    const USER_INDEX = new UserIndexDtoBuilder()
      .withFirstName('John')
      .withLastName('Doe')
      .withEmail('johndoe@gmail.com')
      .withUuid(USER_UUID)
      .build()

    const USER_DETAIL = new UserDetailDtoBuilder()
      .withUuid(USER_UUID)
      .withFirstName('John')
      .withLastName('Doe')
      .withEmail('johndoe@gmail.com')
      .build()

    await worker.use(
      http.post(`*/api/v1/users/${USER_UUID}/role`, () => {
        return HttpResponse.json(USER_DETAIL)
      }),
      http.get(`*/api/v1/users/${USER_UUID}`, () => {
        return HttpResponse.json(USER_DETAIL)
      }),
      http.get('*/api/v1/users*', () => {
        return HttpResponse.json(getPaginatedJson([
          USER_INDEX,
        ]))
      }),
    )

    await page.goto('/contacts')
    await page.getByTestId(TEST_ID.SETTINGS.OPEN_DIALOG_BUTTON).click()
    await expect(page.getByTestId(TEST_ID.SETTINGS.DIALOG)).toBeVisible()

    await page.getByTestId(TEST_ID.SETTINGS.SIDEBAR.USER_BUTTON).click()

    await expect(page.getByTestId(TEST_ID.USERS.OVERVIEW.TABLE.CONTAINER)).toBeVisible()

    await page.getByTestId(TEST_ID.USERS.OVERVIEW.TABLE.ACTION).getByRole('button').nth(0).click()

    await expect(page.getByTestId(TEST_ID.SETTINGS.FEATURES.USERS.DIALOG)).toBeVisible()

    await page.getByTestId(TEST_ID.SETTINGS.FEATURES.USERS.ROLE_SELECT).click()

    await page.getByText('Manager').click()

    await page.getByTestId(TEST_ID.SETTINGS.FEATURES.USERS.ROLE_SELECT).click()

    await page.getByTestId(TEST_ID.SETTINGS.FEATURES.USERS.SUBMIT_BUTTON).click()
  })
})
