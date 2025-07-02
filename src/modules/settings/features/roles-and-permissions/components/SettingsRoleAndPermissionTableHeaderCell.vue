<script setup lang="ts">
import {
  VcDropdownMenu,
  VcDropdownMenuItem,
  VcIcon,
} from '@wisemen/vue-core-components'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import { Permission } from '@/client'
import AppUnstyledButton from '@/components/app/button/AppUnstyledButton.vue'
import type { SettingsRole } from '@/modules/settings/models/role/settingsRole.model.ts'
import type { SettingsRoleUuid } from '@/modules/settings/models/role/settingsRoleUuid.model.ts'
import { useAuthStore } from '@/stores/auth.store.ts'

const props = defineProps<{
  role: SettingsRole
}>()

const emit = defineEmits<{
  deleteRole: [SettingsRoleUuid]
}>()

const i18n = useI18n()
const authStore = useAuthStore()

const isDeleteButtonVisible = computed<boolean>(() => authStore.hasPermission(Permission.ROLE_DELETE))

function onSelectMenuItem(): void {
  emit('deleteRole', props.role.uuid)
}
</script>

<template>
  <div
    class="
      flex items-center justify-center gap-4 p-3 px-6 text-sm text-nowrap
      text-secondary
    "
  >
    <span>
      {{ props.role.name }}
    </span>
    <VcDropdownMenu
      v-if="isDeleteButtonVisible"
      :is-arrow-hidden="true"
      side="top"
    >
      <template #trigger>
        <AppUnstyledButton>
          <VcIcon
            icon="threeDots"
            class="size-4"
          />
        </AppUnstyledButton>
      </template>
      <template #content>
        <VcDropdownMenuItem
          :is-destructive="true"
          :label="i18n.t('module.settings.roles_and_permissions.table.delete_role')"
          icon="trash"
          @select="onSelectMenuItem"
        />
      </template>
    </VcDropdownMenu>
  </div>
</template>
