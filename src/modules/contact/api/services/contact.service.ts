import type {
  PaginatedData,
  PaginationOptions,
} from '@wisemen/vue-core-components'
import { PaginationParamsBuilder } from '@wisemen/vue-core-components'
import type { Result } from 'neverthrow'
import { ResultAsync } from 'neverthrow'

import {
  createContactV1,
  deleteContactV1,
  updateContactV1,
  viewContactDetailV1,
  viewContactIndexV1,
} from '@/client'
import {
  ContactCreateTransformer,
  ContactDetailTransformer,
  ContactIndexPaginationTransformer,
  ContactIndexTransformer,
  ContactUpdateTransformer,
} from '@/models/contact/contact.transformer'
import type { ContactUuid } from '@/models/contact/contactUuid.model'
import type { ContactCreateForm } from '@/models/contact/create/contactCreateForm.model'
import type { ContactDetail } from '@/models/contact/detail/contactDetail.model'
import type { ContactIndex } from '@/models/contact/index/contactIndex.model'
import type { ContactIndexPagination } from '@/models/contact/index/contactIndexPagination.model'
import type { ContactUpdateForm } from '@/models/contact/update/contactUpdateForm.model'

export class ContactService {
  static async create(form: ContactCreateForm): Promise<Result<ContactUuid, Error>> {
    const dto = ContactCreateTransformer.toDto(form)
    const response = await ResultAsync.fromPromise(createContactV1({
      body: dto,
    }), () => new Error('Failed to create contact'))

    return response.map((res) => res.data.uuid as ContactUuid)
  }

  static async delete(contactUuid: ContactUuid): Promise<Result<void, Error>> {
    const response = await ResultAsync.fromPromise(
      deleteContactV1({
        responseValidator: undefined,
        path: {
          uuid: contactUuid,
        },
      }),
      () => new Error('Failed to create contact'),
    )

    return response.map((res) => res.data)
  }

  static async getAll(
    paginationOptions: PaginationOptions<ContactIndexPagination>,
  ): Promise<PaginatedData<ContactIndex>> {
    const query = new PaginationParamsBuilder(paginationOptions)
      .build(ContactIndexPaginationTransformer.toDto)

    const response = await viewContactIndexV1({
      query,
    })

    return {
      data: response.data.items.map(ContactIndexTransformer.fromDto),
      meta: response.data.meta,
    }
  }

  static async getByUuid(contactUuid: ContactUuid): Promise<ContactDetail> {
    const response = await viewContactDetailV1({
      path: {
        uuid: contactUuid,
      },
    })

    return ContactDetailTransformer.fromDto(response.data)
  }

  static async update(contactUuid: ContactUuid, form: ContactUpdateForm): Promise<Result<void, Error>> {
    const dto = ContactUpdateTransformer.toDto(form)
    const response = await ResultAsync.fromPromise(
      updateContactV1({
        body: dto,
        responseValidator: undefined,
        path: {
          uuid: contactUuid,
        },
      }),
      () => new Error('Failed to update contact'),
    )

    return response.map((res) => res.data)
  }
}
