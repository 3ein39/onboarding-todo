<script setup lang="ts">
import {
  VcCheckbox,
  VcIcon,
  VcTooltip,
} from '@wisemen/vue-core-components'
import type { Form } from 'formango'
import { ref } from 'vue'

import type { Permission } from '@/client'
import AppUnstyledButton from '@/components/app/button/AppUnstyledButton.vue'
import AppHeightTransition from '@/components/app/transition/AppHeightTransition.vue'
import type {
  SettingsPermissionGroup,
  SettingsPermissionItem,
} from '@/modules/settings/models/permission/settingsPermission.model.ts'
import type { SettingsRole } from '@/modules/settings/models/role/settingsRole.model.ts'
import type { settingsRolePermissionUpdateFormSchema } from '@/modules/settings/models/role/settingsRolePermissionUpdateForm.model.ts'
import type { SettingsRoleUuid } from '@/modules/settings/models/role/settingsRoleUuid.model.ts'
import { assert } from '@/utils/assert.util.ts'

const props = defineProps<{
  isTableScrollable: boolean
  isTableScrolledToBottom: boolean
  form: Form<typeof settingsRolePermissionUpdateFormSchema>
  permissions: SettingsPermissionGroup[]
  roles: SettingsRole[]
}>()

const openPermissionTabs = ref<string[]>([])

const rolesForm = props.form.registerArray('roles')

function onTogglePermissionActionsClick(key: string): void {
  if (getActionsForKey(key).length === 1) {
    return
  }

  if (isPermissionTabOpen(key)) {
    openPermissionTabs.value = openPermissionTabs.value.filter((tab) => tab !== key)
  }
  else {
    openPermissionTabs.value.push(key)
  }
}

function isPermissionTabOpen(key: string): boolean {
  return openPermissionTabs.value.includes(key)
}

function getActionsForKey(key: string): Permission[] {
  return props.permissions.find((permission) => permission.name === key)?.items.flatMap((item) => item.key) ?? []
}

function getActiveActionsForKeyAndRole(key: string, roleUuid: SettingsRoleUuid): Permission[] {
  const value = rolesForm.modelValue.value.find((value) => value.roleUuid === roleUuid)?.permissions ?? []

  return value.find((v) => v.key === key)?.actions ?? []
}

function isPermissionCheckboxChecked(key: string, roleUuid: SettingsRoleUuid): boolean {
  const permissionsForRole = rolesForm.modelValue.value.find((role) => role.roleUuid === roleUuid)?.permissions ?? []

  return (permissionsForRole.find((p) => p.key === key)?.actions.length ?? 0) > 0
}

function isActionCheckboxChecked(
  key: string,
  roleUuid: SettingsRoleUuid,
  action: SettingsPermissionItem,
): boolean {
  const activeActions = getActiveActionsForKeyAndRole(key, roleUuid)

  return activeActions.includes(action.key)
}

function isPermissionCheckboxIndeterminate(key: string, roleUuid: SettingsRoleUuid): boolean {
  const allActions = getActionsForKey(key)
  const activeActions = getActiveActionsForKeyAndRole(key, roleUuid)

  return activeActions.length > 0 && activeActions.length < allActions.length
}

function onUpdatePermissionCheckbox(value: boolean, key: string, roleUuid: SettingsRoleUuid): void {
  const roleIndex = rolesForm.modelValue.value.findIndex((role) => role.roleUuid === roleUuid)

  const permissionsForRole = rolesForm.register(`${roleIndex}`)

  const permissionsForRoleValue = permissionsForRole.modelValue.value

  assert(permissionsForRoleValue !== null, `Role ${roleUuid} not found`)

  const filteredPermissions = permissionsForRoleValue.permissions.filter((permission) => permission.key !== key)

  permissionsForRole.setValue({
    roleUuid,
    isEditable: permissionsForRoleValue.isEditable,
    permissions: value
      ? [
          ...filteredPermissions,
          {
            actions: getActionsForKey(key),
            key,
          },
        ]
      : filteredPermissions,
  })
}

function isPermissionCheckboxDisabled(roleUuid: SettingsRoleUuid): boolean {
  return !(rolesForm.modelValue.value.find((role) => role.roleUuid === roleUuid)?.isEditable ?? false)
}

function onUpdateActionCheckbox(
  value: boolean,
  groupKey: string,
  roleUuid: SettingsRoleUuid,
  action: SettingsPermissionItem,
): void {
  const roleIndex = rolesForm.modelValue.value.findIndex((role) => role.roleUuid === roleUuid)

  const permissionsForRole = rolesForm.register(`${roleIndex}`)

  const permissionForRoleValue = permissionsForRole.modelValue.value

  assert(permissionForRoleValue !== null, `Role ${roleUuid} not found`)

  const map = permissionForRoleValue.permissions.map((permission) => {
    if (permission.key !== groupKey) {
      return permission
    }

    const actions = permission.actions.filter((a) => a !== action.key)

    const updatedActions = value
      ? [
          ...actions,
          action.key,
        ]
      : actions

    return {
      ...permission,
      actions: updatedActions,
    }
  })

  permissionsForRole.setValue({
    roleUuid,
    isEditable: permissionForRoleValue.isEditable,
    permissions: map ?? [],
  })
}
</script>

<template>
  <div
    v-for="permission of props.permissions"
    :key="permission.name"
    :class="{
      'last:border-b-0': props.isTableScrolledToBottom,
    }"
    class="
      col-span-full grid grid-cols-subgrid border-b border-solid
      border-secondary
    "
  >
    <div class="z-2 col-span-full grid grid-cols-subgrid">
      <Component
        :is="permission.items.length > 1 ? AppUnstyledButton : 'div'"
        class="
          sticky left-0 z-1 flex items-center justify-between border-r
          border-solid border-secondary bg-primary p-3 px-6 text-left text-sm
          uppercase !ring-offset-0
        "
        @click="onTogglePermissionActionsClick(permission.name)"
      >
        <span class="text-sm font-medium text-primary capitalize">
          {{ permission.name }}
        </span>

        <VcIcon
          v-if="permission.items.length > 1"
          :icon="isPermissionTabOpen(permission.name) ? 'chevronUp' : 'chevronDown'"
          class="size-4 text-secondary"
        />
      </Component>

      <div
        v-for="(role) of props.roles"
        :key="role.uuid"
        class="
          flex items-center justify-center border-r border-solid
          border-secondary p-3
          last:border-none
        "
      >
        <VcCheckbox
          :model-value="isPermissionCheckboxChecked(permission.name, role.uuid)"
          :is-disabled="isPermissionCheckboxDisabled(role.uuid)"
          :is-indeterminate="isPermissionCheckboxIndeterminate(permission.name, role.uuid)"
          @update:model-value="(event) => onUpdatePermissionCheckbox(event, permission.name, role.uuid)"
        />
      </div>
    </div>

    <AppHeightTransition :duration="0.2">
      <div
        v-if="isPermissionTabOpen(permission.name)"
        class="col-span-full grid grid-cols-subgrid items-start"
      >
        <div
          v-for="(action, actionIndex) in permission.items"
          :key="action.key"
          class="
            col-span-full grid grid-cols-subgrid border-b border-secondary
            first:border-t
            last:border-b-0
          "
        >
          <div
            class="
              sticky left-0 z-10 flex gap-2 border-r border-secondary
              bg-secondary p-3 pl-10 text-secondary
            "
          >
            <VcIcon
              :class="{
                'opacity-100': actionIndex === 0,
              }"
              icon="bottomLeftCorner"
              class="mt-0.5 size-3 text-quaternary opacity-0"
            />
            <span class="flex items-center gap-md text-sm text-secondary">
              {{ action.name }}
              <VcTooltip
                :class-config="{
                  innerContent: 'p-md text-sm text-secondary',
                }"
              >
                <template #trigger>
                  <VcIcon
                    icon="infoCircle"
                    class="size-3 shrink-0 text-quaternary"
                  />
                </template>
                <template #content>
                  {{ action.description }}
                </template>
              </VcTooltip>
            </span>
          </div>

          <div
            v-for="role of props.roles"
            :key="role.uuid"
            class="
              flex justify-center border-r border-solid border-secondary
              bg-secondary p-3 text-sm
              last:border-none
            "
          >
            <VcCheckbox
              :is-disabled="isPermissionCheckboxDisabled(role.uuid)"
              :model-value="isActionCheckboxChecked(permission.name, role.uuid, action)"
              @update:model-value="(event) => onUpdateActionCheckbox(event, permission.name, role.uuid, action)"
            />
          </div>
        </div>
      </div>
    </AppHeightTransition>
  </div>
</template>
