import {
  AddressTransformer,
  AddressUpdateTransformer,
} from '@/models/address/address.transformer.ts'
import type { ContactUuid } from '@/models/contact/contactUuid.model'
import type { ContactCreateDto } from '@/models/contact/create/contactCreateDto.model'
import type { ContactCreateForm } from '@/models/contact/create/contactCreateForm.model'
import type { ContactDetail } from '@/models/contact/detail/contactDetail.model'
import type { ContactDetailDto } from '@/models/contact/detail/contactDetailDto.model'
import type { ContactIndex } from '@/models/contact/index/contactIndex.model'
import type { ContactIndexDto } from '@/models/contact/index/contactIndexDto.model'
import type { ContactIndexPagination } from '@/models/contact/index/contactIndexPagination.model'
import type { ContactIndexPaginationDto } from '@/models/contact/index/contactIndexPaginationDto.model'
import type { ContactUpdateDto } from '@/models/contact/update/contactUpdateDto.model'
import type { ContactUpdateForm } from '@/models/contact/update/contactUpdateForm.model'
import { CalendarDateTransformer } from '@/models/date/calendarDate.transformer.ts'

export class ContactIndexTransformer {
  static fromDto(dto: ContactIndexDto): ContactIndex {
    return {
      uuid: dto.uuid as ContactUuid,
      isActive: dto.isActive,
      name: dto.name,
      address: AddressTransformer.fromNullableDto(dto.address),
      email: dto.email,
      phone: dto.phone,
    }
  }
}

export class ContactIndexPaginationTransformer {
  static toDto(pagination: ContactIndexPagination): ContactIndexPaginationDto {
    return {
      filter: {
        isActive: pagination.filter?.isActive !== undefined
          ? String(pagination.filter.isActive)
          : undefined,
      },
      sort: pagination.sort,
    }
  }
}

export class ContactDetailTransformer {
  static fromDto(dto: ContactDetailDto): ContactDetail {
    return {
      uuid: dto.uuid as ContactUuid,
      birthDate: CalendarDateTransformer.fromNullableDto(dto.birthDate),
      createdAt: dto.createdAt,
      updatedAt: dto.updatedAt,
      isActive: dto.isActive,
      address: dto.address ? AddressTransformer.fromDto(dto.address) : null,
      email: dto.email,
      file: null,
      firstName: dto.firstName,
      lastName: dto.lastName,
      phone: dto.phone,
    }
  }
}

export class ContactCreateTransformer {
  static toDto(form: ContactCreateForm): ContactCreateDto {
    return {
      avatarUuid: null,
      fileUuid: null,
      birthDate: CalendarDateTransformer.toDto(form.birthDate),
      address: AddressUpdateTransformer.toNullableDto(form.address),
      balance: null,
      discount: null,
      email: form.email,
      firstName: form.firstName,
      lastName: form.lastName,
      phone: form.phone,
    }
  }
}

export class ContactUpdateTransformer {
  static toDto(form: ContactUpdateForm): ContactUpdateDto {
    return {
      avatarUuid: null,
      fileUuid: null,
      birthDate: CalendarDateTransformer.toDto(form.birthDate),
      isActive: form.isActive,
      address: AddressUpdateTransformer.toDto(form.address),
      balance: null,
      discount: null,
      email: form.email,
      firstName: form.firstName,
      lastName: form.lastName,
      phone: form.phone,
    }
  }

  static toForm(contact: ContactDetail): ContactUpdateForm {
    return {
      birthDate: contact.birthDate ?? new Date(),
      isActive: contact.isActive,
      address: AddressTransformer.toForm(contact.address!),
      email: contact.email,
      file: null,
      firstName: contact.firstName ?? '',
      lastName: contact.lastName ?? '',
      phone: contact.phone,
    }
  }
}
