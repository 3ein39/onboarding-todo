<script setup lang="ts">
import type { Address } from '@wisemen/vue-core-components'
import { VcTableCell } from '@wisemen/vue-core-components'

import { AddressUtil } from '@/utils/address.util'

const props = defineProps<{
  address: Address
}>()
</script>

<template>
  <VcTableCell>
    <span>
      {{ AddressUtil.format(props.address) }}
    </span>
  </VcTableCell>
</template>
