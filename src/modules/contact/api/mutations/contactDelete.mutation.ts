import { useMutation } from '@wisemen/vue-core-query'

import type { ContactUuid } from '@/models/contact/contactUuid.model'
import { ContactService } from '@/modules/contact/api/services/contact.service'

interface Params {
  contactUuid: ContactUuid
}

export function useContactDeleteMutation() {
  return useMutation({
    queryFn: async (queryOptions: { params: Params }) => {
      return await ContactService.delete(queryOptions.params.contactUuid)
    },
    queryKeysToInvalidate: {
      contactIndex: {},
    },
  })
}
