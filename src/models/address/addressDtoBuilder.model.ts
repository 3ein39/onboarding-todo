import type { AddressDto } from '@/models/address/addressDto.model.ts'

export class AddressDtoBuilder {
  private value: AddressDto = {
    city: 'Diepenbeek',
    coordinates: {
      latitude: 0,
      longitude: 0,
    },
    country: 'Belgium',
    postalCode: '3590',
    streetName: 'Watertorenstraat 2',
    streetNumber: '1',
    unit: null,
  }

  build(): AddressDto {
    return this.value
  }

  withCity(city: string): AddressDtoBuilder {
    this.value.city = city

    return this
  }

  withCoordinates(coordinates: {
    latitude: number
    longitude: number
  }): AddressDtoBuilder {
    this.value.coordinates = coordinates

    return this
  }

  withCountry(country: string): AddressDtoBuilder {
    this.value.country = country

    return this
  }

  withPostalCode(postalCode: string): AddressDtoBuilder {
    this.value.postalCode = postalCode

    return this
  }

  withStreetName(streetName: string): AddressDtoBuilder {
    this.value.streetName = streetName

    return this
  }

  withStreetNumber(streetNumber: string): AddressDtoBuilder {
    this.value.streetNumber = streetNumber

    return this
  }

  withUnit(unit: string | null): AddressDtoBuilder {
    this.value.unit = unit

    return this
  }
}
