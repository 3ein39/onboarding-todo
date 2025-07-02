<script setup lang="ts">
import { VcTableCell } from '@wisemen/vue-core-components'

import { TEST_ID } from '@/constants/testId.constant'
import type { UserIndex } from '@/models/user/index/userIndex.model.ts'

const props = defineProps<{
  user: UserIndex
}>()
</script>

<template>
  <VcTableCell>
    <div>
      <p
        :data-test-id="TEST_ID.USERS.OVERVIEW.TABLE.NAME"
        class="text-md font-semibold text-primary"
      >
        {{ props.user.fullName }}
      </p>
      <p
        :data-test-id="TEST_ID.USERS.OVERVIEW.TABLE.EMAIL"
        class="text-xs"
      >
        {{ props.user.email }}
      </p>
    </div>
  </VcTableCell>
</template>
