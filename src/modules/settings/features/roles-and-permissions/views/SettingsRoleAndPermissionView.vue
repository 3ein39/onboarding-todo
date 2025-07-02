<script setup lang="ts">
import {
  useVcDialog,
  VcButton,
} from '@wisemen/vue-core-components'
import { useForm } from 'formango'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import { Permission } from '@/client'
import AppGroup from '@/components/app/group/AppGroup.vue'
import AppForm from '@/components/form/AppForm.vue'
import FormSubmitButton from '@/components/form/FormSubmitButton.vue'
import { useApiErrorToast } from '@/composables/api-error-toast/apiErrorToast.composable'
import { useUnsavedChanges } from '@/composables/unsaved-changes/unsavedChanges.composable'
import { useSettingsRoleBulkUpdateMutation } from '@/modules/settings/api/mutations/settingsRoleBulkUpdate.mutation.ts'
import { useSettingsRoleDeleteMutation } from '@/modules/settings/api/mutations/settingsRoleDelete.mutation.ts'
import { useSettingsPermissionQuery } from '@/modules/settings/api/queries/settingsPermission.query.ts'
import { useSettingsRolesQuery } from '@/modules/settings/api/queries/settingsRole.query.ts'
import SettingsRoleAndPermissionTable from '@/modules/settings/features/roles-and-permissions/components/SettingsRoleAndPermissionTable.vue'
import type { SettingsPermissionGroup } from '@/modules/settings/models/permission/settingsPermission.model.ts'
import type { SettingsRole } from '@/modules/settings/models/role/settingsRole.model.ts'
import { SettingsRolePermissionUpdateTransformer } from '@/modules/settings/models/role/settingsRole.transformer.ts'
import type { SettingsRolePermissionUpdateForm } from '@/modules/settings/models/role/settingsRolePermissionUpdateForm.model.ts'
import { settingsRolePermissionUpdateFormSchema } from '@/modules/settings/models/role/settingsRolePermissionUpdateForm.model.ts'
import type { SettingsRoleUuid } from '@/modules/settings/models/role/settingsRoleUuid.model.ts'
import { useAuthStore } from '@/stores/auth.store.ts'

const i18n = useI18n()
const authStore = useAuthStore()
const apiErrorToast = useApiErrorToast()

const settingsPermissionQuery = useSettingsPermissionQuery()
const settingsRoleQuery = useSettingsRolesQuery()

const addRoleDialog = useVcDialog({
  component: () => import('@/modules/settings/features/roles-and-permissions/components/SettingsRoleAndPermissionRoleCreateDialog.vue'),
})
const settingsRoleDeleteMutation = useSettingsRoleDeleteMutation()
const settingsRolesBulkUpdateMutation = useSettingsRoleBulkUpdateMutation()

const permissions = computed<SettingsPermissionGroup[]>(() => settingsPermissionQuery.data.value ?? [])
const roles = computed<SettingsRole[]>(() => settingsRoleQuery.data.value ?? [])

const isAddNewRoleButtonVisible = computed<boolean>(() => authStore.hasPermission(Permission.ROLE_CREATE))
const isSaveChangesButtonVisible = computed<boolean>(() => authStore.hasPermission(Permission.ROLE_UPDATE))

const form = useForm({
  initialState: computed<SettingsRolePermissionUpdateForm>(() => {
    return SettingsRolePermissionUpdateTransformer.toForm(roles.value, permissions.value)
  }),
  schema: settingsRolePermissionUpdateFormSchema,
  onSubmit: async (values: SettingsRolePermissionUpdateForm) => {
    const response = await settingsRolesBulkUpdateMutation.execute({
      body: values,
    })

    if (response.isErr()) {
      apiErrorToast.show(response.error)
    }
  },
})

const isRolesModelMapChanged = computed<boolean>(() => form.isDirty.value)

const rolesForm = form.registerArray('roles')

function onAddNewRoleButtonClick(): void {
  addRoleDialog.open({
    id: 'addRole',
  })
}

async function onDeleteRow(roleUuid: SettingsRoleUuid): Promise<void> {
  const result = await settingsRoleDeleteMutation.execute({
    body: roleUuid,
  })

  result.match(
    () => {
      const roleIndex = roles.value.findIndex((role) => role.uuid === roleUuid)

      rolesForm.remove(roleIndex)
    },
    (error) => {
      apiErrorToast.show(error)
    },
  )
}

useUnsavedChanges(isRolesModelMapChanged)
</script>

<template>
  <AppForm
    :form="form"
    class="relative h-full bg-error-200"
  >
    <SettingsRoleAndPermissionTable
      :form="form"
      :permissions="permissions"
      :roles="roles"
      @delete-role="onDeleteRow"
    />
    <AppGroup
      direction="row"
      justify="end"
      class="
        sticky bottom-0 left-0 z-10 w-full border-t border-secondary bg-primary
        p-lg
      "
    >
      <VcButton
        v-if="isAddNewRoleButtonVisible"
        size="sm"
        variant="secondary"
        icon-left="plus"
        @click="onAddNewRoleButtonClick"
      >
        {{ i18n.t('module.settings.roles_and_permissions.add_new_role') }}
      </VcButton>
      <FormSubmitButton
        v-if="isSaveChangesButtonVisible"
        :form="form"
        :label="i18n.t('module.settings.roles_and_permissions.save_changes')"
        class="w-min"
      />
    </AppGroup>
  </AppForm>
</template>
