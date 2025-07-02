import { AddressDtoBuilder } from '@/models/address/addressDtoBuilder.model.ts'
import type { ContactIndexDto } from '@/models/contact/index/contactIndexDto.model'
import { UuidUtil } from '@/utils/uuid.util'

export class ContactIndexDtoBuilder {
  value: ContactIndexDto = {
    uuid: UuidUtil.getRandom(),
    isActive: true,
    name: 'John Doe',
    address: new AddressDtoBuilder().build(),
    email: 'john.doe@email.com',
    phone: '+1 234 567 890',
  }

  build(): ContactIndexDto {
    return this.value
  }

  withEmail(email: string | null): ContactIndexDtoBuilder {
    this.value.email = email

    return this
  }

  withIsActive(isActive: boolean): ContactIndexDtoBuilder {
    this.value.isActive = isActive

    return this
  }

  withName(name: string): ContactIndexDtoBuilder {
    this.value.name = name

    return this
  }

  withPhone(phone: string | null): ContactIndexDtoBuilder {
    this.value.phone = phone

    return this
  }
}
