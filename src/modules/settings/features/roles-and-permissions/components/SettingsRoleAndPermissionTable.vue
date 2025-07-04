<script setup lang="ts">
import { useScroll } from '@vueuse/core'
import type { Form } from 'formango'
import {
  computed,
  ref,
} from 'vue'

import SettingsRoleAndPermissionTableBody from '@/modules/settings/features/roles-and-permissions/components/SettingsRoleAndPermissionTableBody.vue'
import SettingsRoleAndPermissionTableHeader from '@/modules/settings/features/roles-and-permissions/components/SettingsRoleAndPermissionTableHeader.vue'
import type { SettingsPermissionGroup } from '@/modules/settings/models/permission/settingsPermission.model.ts'
import type { SettingsRole } from '@/modules/settings/models/role/settingsRole.model.ts'
import type { settingsRolePermissionUpdateFormSchema } from '@/modules/settings/models/role/settingsRolePermissionUpdateForm.model.ts'
import type { SettingsRoleUuid } from '@/modules/settings/models/role/settingsRoleUuid.model.ts'

const props = defineProps<{
  form: Form<typeof settingsRolePermissionUpdateFormSchema>
  permissions: SettingsPermissionGroup[]
  roles: SettingsRole[]
}>()

const emit = defineEmits<{
  deleteRole: [SettingsRoleUuid]
}>()

const tableScrollContainerRef = ref<HTMLElement | null>(null)

const scroll = useScroll(tableScrollContainerRef)

const isTableScrollable = computed<boolean>(() => !scroll.arrivedState.bottom || !scroll.arrivedState.top)

const isTableScrolledToBottom = computed<boolean>(() => {
  if (!isTableScrollable.value) {
    return false
  }

  return scroll.arrivedState.bottom
})

const gridColsStyle = computed<string>(() => {
  const firstColumn = 'minmax(250px, 300px)'

  return `${firstColumn} ${props.roles.map(() => `minmax(200px, auto)`).join(' ')}`
})

function onDeleteRole(roleUuid: SettingsRoleUuid): void {
  emit('deleteRole', roleUuid)
}
</script>

<template>
  <div class="flex flex-1 flex-col overflow-hidden bg-primary">
    <div
      ref="tableScrollContainerRef"
      :style="{
        gridTemplateColumns: gridColsStyle,
      }"
      class="grid overflow-auto"
    >
      <SettingsRoleAndPermissionTableHeader
        :roles="props.roles"
        @delete-role="onDeleteRole"
      />

      <SettingsRoleAndPermissionTableBody
        :roles="props.roles"
        :form="props.form"
        :is-table-scrollable="isTableScrollable"
        :is-table-scrolled-to-bottom="isTableScrolledToBottom"
        :permissions="props.permissions"
      />
    </div>
  </div>
</template>
