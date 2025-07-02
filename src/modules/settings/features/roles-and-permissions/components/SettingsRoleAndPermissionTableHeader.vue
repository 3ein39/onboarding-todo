<script setup lang="ts">
import { VcIcon } from '@wisemen/vue-core-components'
import { useI18n } from 'vue-i18n'

import SettingsRoleAndPermissionTableHeaderCell from '@/modules/settings/features/roles-and-permissions/components/SettingsRoleAndPermissionTableHeaderCell.vue'
import type { SettingsRole } from '@/modules/settings/models/role/settingsRole.model.ts'
import type { SettingsRoleUuid } from '@/modules/settings/models/role/settingsRoleUuid.model.ts'

const props = defineProps<{
  roles: SettingsRole[]
}>()

const emit = defineEmits<{
  deleteRole: [SettingsRoleUuid]
}>()

const i18n = useI18n()

function onDeleteRole(roleUuid: SettingsRoleUuid): void {
  emit('deleteRole', roleUuid)
}
</script>

<template>
  <div
    class="
      sticky top-0 z-11 col-span-full grid grid-cols-subgrid border-b
      border-solid border-secondary bg-secondary
    "
  >
    <div
      class="
        sticky left-0 flex items-center gap-2 border-r border-solid
        border-secondary bg-secondary p-3 px-6 text-sm text-secondary
      "
    >
      <span>
        {{ i18n.t('module.settings.roles_and_permissions.table.permissions') }}
      </span>
      <VcIcon
        class="size-4"
        icon="bottomRightCorner"
      />
    </div>
    <div
      v-for="role of props.roles"
      :key="role.uuid"
      class="
        border-r border-solid border-secondary
        last:border-none
      "
    >
      <SettingsRoleAndPermissionTableHeaderCell
        :role="role"
        @delete-role="onDeleteRole"
      />
    </div>
  </div>
</template>
