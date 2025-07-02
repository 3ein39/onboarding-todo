import { HttpResponse } from 'msw'

import { TEST_ID } from '@/constants/testId.constant.ts'
import { ContactDetailDtoBuilder } from '@/models/contact/detail/contactDetailDto.builder'
import {
  expect,
  test,
} from '@@/base.fixture'

test('delete a contact', async ({
  http,
  page,
  worker,
}) => {
  const CONTACT = new ContactDetailDtoBuilder().build()

  await worker.use(
    http.get(`*/api/v1/contacts/${CONTACT.uuid}`, () => {
      return HttpResponse.json(CONTACT)
    }),
    http.get('*/api/v1/contacts', () => {
      return HttpResponse.json({
        items: [],
        meta: {
          limit: 10,
          offset: 0,
          total: 0,
        },
      })
    }),
    http.delete(`*/api/v1/contacts/${CONTACT.uuid}`, () => {
      return HttpResponse.json({}, {
        status: 201,
      })
    }),
  )

  await page.goto(`/contacts/${CONTACT.uuid}`)

  await page.getByTestId(TEST_ID.CONTACTS.DETAIL.DELETE_BUTTON).click()

  await page.getByRole('button', {
    name: 'Delete Enter',
  }).click()

  await expect(page).toHaveURL('/contacts')
})
