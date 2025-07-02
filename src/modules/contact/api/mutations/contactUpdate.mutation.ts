import { useMutation } from '@wisemen/vue-core-query'

import type { ContactUuid } from '@/models/contact/contactUuid.model'
import type { ContactUpdateForm } from '@/models/contact/update/contactUpdateForm.model'
import { ContactService } from '@/modules/contact/api/services/contact.service'

interface Params {
  contactUuid: ContactUuid
}

export function useContactUpdateMutation() {
  return useMutation({
    queryFn: async (queryOptions: {
      body: ContactUpdateForm
      params: Params
    }) => {
      return await ContactService.update(queryOptions.params.contactUuid, queryOptions.body)
    },
    queryKeysToInvalidate: {
      contactDetail: {
        contactUuid: (params) => params.contactUuid,
      },
      contactIndex: {},
    },
  })
}
