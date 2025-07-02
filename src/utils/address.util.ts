import type { Address } from '@wisemen/vue-core-components'

export class AddressUtil {
  static format(address: Address | null): string {
    if (address === null) {
      return '-'
    }

    return `${address.street ?? ''} ${address.streetNumber ?? ''}, ${address.city ?? ''}, ${address.postalCode ?? ''}, ${address.country ?? ''}`
  }
}
