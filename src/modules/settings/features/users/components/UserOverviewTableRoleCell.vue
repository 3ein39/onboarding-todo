<script setup lang="ts">
import {
  VcBadge,
  VcTableCell,
  VcTooltip,
} from '@wisemen/vue-core-components'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import { TEST_ID } from '@/constants/testId.constant'
import type { UserIndex } from '@/models/user/index/userIndex.model.ts'
import type { UserRole } from '@/models/user/roles/role.model.ts'

const props = defineProps<{
  user: UserIndex
}>()

const i18n = useI18n()

const visibleRoles = computed<UserRole[]>(() => props.user.roles?.slice(0, 2) ?? [])
const extraRolesCount = computed<number>(() => (props.user.roles?.length ?? 0) - 2)
const hasExtraRoles = computed<boolean>(() => extraRolesCount.value > 0)
const extraRoles = computed<UserRole[]>(() => props.user.roles?.slice(2) ?? [])
const allRolesTooltipContent = computed<string>(() => props.user.roles?.map((role) => role.name).join(', ') ?? '')
</script>

<template>
  <VcTableCell>
    <div class="flex items-center gap-sm">
      <VcBadge
        v-for="role in visibleRoles"
        :key="role.uuid"
        :data-test-id="TEST_ID.USERS.OVERVIEW.TABLE.ROLE"
        :label="role.name"
        color="brand"
        class="text-xs"
        size="md"
        variant="translucent"
      >
        <p>
          {{ role.name }}
        </p>
      </VcBadge>

      <VcTooltip
        v-if="hasExtraRoles"
        :label="i18n.t('users.overview.extra_roles_tooltip', { count: extraRolesCount, roles: allRolesTooltipContent })"
        :class-config="{
          innerContent: 'bg-primary text-primary text-md rounded py-xs px-sm',
          content: 'rounded-lg',
        }"
      >
        <template #trigger>
          <VcBadge
            :label="`+${extraRolesCount}`"
            color="brand"
            class="text-xs"
            size="md"
            variant="translucent"
          >
            <p>
              {{ `+${extraRolesCount}` }}
            </p>
          </VcBadge>
        </template>
        <template #content>
          <div class="flex items-center gap-sm">
            <VcBadge
              v-for="role in extraRoles"
              :key="role.uuid"
              :data-test-id="TEST_ID.USERS.OVERVIEW.TABLE.ROLE"
              :label="role.name"
              color="brand"
              class="text-xs"
              size="md"
              variant="translucent"
            >
              <p>
                {{ role.name }}
              </p>
            </vcbadge>
          </div>
        </template>
      </VcTooltip>
    </div>
  </VcTableCell>
</template>
