<script setup lang="ts">
import { computed } from 'vue'

import { useNotificationMarkAsReadMutation } from '@/api/notification/mutations/notificationMarkAsRead.mutation'
import { useApiErrorToast } from '@/composables/api-error-toast/apiErrorToast.composable'
import type { NotificationIndex } from '@/models/notification/notificationIndex.model'
import { useProvideNotificationCenterItemContext } from '@/modules/notification/features/center/components/item/notificationCenterItem.context'

const props = defineProps<{
  notification: NotificationIndex
}>()

const markAsReadMutation = useNotificationMarkAsReadMutation()
const apiErrorToast = useApiErrorToast()

async function markAsRead(): Promise<void> {
  const result = await markAsReadMutation.execute({
    params: {
      uuid: props.notification.notificationUuid,
    },
  })

  if (result.isErr()) {
    apiErrorToast.show(result.error)
  }
}

useProvideNotificationCenterItemContext({
  markAsRead,
  notification: computed<NotificationIndex>(() => props.notification),
})
</script>

<template>
  <slot />
</template>
