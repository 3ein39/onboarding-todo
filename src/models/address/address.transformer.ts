import type { Address } from '@wisemen/vue-core-components'

import type { AddressDto } from '@/models/address/addressDto.model'
import type { AddressForm } from '@/models/address/addressForm.model'
import type { AddressUpdateDto } from '@/models/address/addressUpdateDto.model.ts'

export class AddressUpdateTransformer {
  static toDto(form: AddressForm): AddressUpdateDto {
    return {
      placeId: null,
      city: form.city === '' ? null : form.city,
      coordinates: {
        latitude: form.coordinates.lat ?? 0,
        longitude: form.coordinates.lng ?? 0,
      },
      country: form.country === '' ? null : form.country,
      placeName: null,
      postalCode: form.postalCode === '' ? null : form.postalCode,
      streetName: form.street === '' ? null : form.street,
      streetNumber: form.streetNumber === '' ? null : form.streetNumber,
      unit: form.bus === '' ? null : form.bus,
    }
  }

  static toNullableDto(address: AddressForm | null): AddressUpdateDto | null {
    if (address === null) {
      return null
    }

    return this.toDto(address)
  }
}

export class AddressTransformer {
  static fromDto(dto: AddressDto): Address {
    return {
      bus: dto.unit ?? '',
      city: dto.city ?? '',
      coordinates: {
        lat: dto.coordinates?.latitude ?? 0,
        lng: dto.coordinates?.longitude ?? 0,
      },
      country: dto.country ?? '',
      postalCode: dto.postalCode ?? '',
      street: dto.streetName ?? '',
      streetNumber: dto.streetNumber ?? '',
    }
  }

  static fromNullableDto(dto: AddressDto | null): Address | null {
    if (dto === null) {
      return null
    }

    return AddressTransformer.fromDto(dto)
  }

  static toDto(address: AddressForm): AddressDto {
    return {
      city: address.city === '' ? null : address.city,
      coordinates: {
        latitude: address.coordinates.lat ?? 0,
        longitude: address.coordinates.lng ?? 0,
      },
      country: address.country === '' ? null : address.country,
      postalCode: address.postalCode === '' ? null : address.postalCode,
      streetName: address.street === '' ? null : address.street,
      streetNumber: address.streetNumber === '' ? null : address.streetNumber,
      unit: address.bus === '' ? null : address.bus,
    }
  }

  static toForm(address: Address): AddressForm {
    return {
      bus: address.bus ?? '',
      city: address.city ?? '',
      coordinates: {
        lat: address.coordinates?.lat ?? 0,
        lng: address.coordinates?.lng ?? 0,
      },
      country: address.country ?? '',
      postalCode: address.postalCode ?? '',
      street: address.street ?? '',
      streetNumber: address.streetNumber ?? '',
    }
  }

  static toNullableDto(address: AddressForm | null): AddressDto | null {
    if (address === null) {
      return null
    }

    return AddressTransformer.toDto(address)
  }
}
