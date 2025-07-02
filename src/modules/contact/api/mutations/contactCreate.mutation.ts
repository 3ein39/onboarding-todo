import { useMutation } from '@wisemen/vue-core-query'

import type { ContactCreateForm } from '@/models/contact/create/contactCreateForm.model'
import { ContactService } from '@/modules/contact/api/services/contact.service'

export function useContactCreateMutation() {
  return useMutation({
    queryFn: async (queryOptions: { body: ContactCreateForm }) => {
      return await ContactService.create(queryOptions.body)
    },
    queryKeysToInvalidate: {
      contactIndex: {},
    },
  })
}
