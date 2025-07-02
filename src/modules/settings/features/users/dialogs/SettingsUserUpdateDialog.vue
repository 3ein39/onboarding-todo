<script setup lang="ts">
import {
  useVcToast,
  VcAvatar,
  VcButton,
  VcSelect,
  VcSelectItem,
} from '@wisemen/vue-core-components'
import { useForm } from 'formango'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import AppSeparator from '@/components/app/AppSeparator.vue'
import FormDialog from '@/components/app/dialog/FormDialog.vue'
import FormGrid from '@/components/app/grid/FormGrid.vue'
import AppGroup from '@/components/app/group/AppGroup.vue'
import AppSkeletonItem from '@/components/app/skeleton/AppSkeletonItem.vue'
import FormSubmitButton from '@/components/form/FormSubmitButton.vue'
import { useApiErrorToast } from '@/composables/api-error-toast/apiErrorToast.composable.ts'
import { TEST_ID } from '@/constants/testId.constant.ts'
import type { UserDetail } from '@/models/user/detail/userDetail.model.ts'
import { userUpdateFormSchema } from '@/models/user/update/userUpdateForm.model.ts'
import type { UserUuid } from '@/models/user/userUuid.model.ts'
import { useSettingsRolesQuery } from '@/modules/settings/api/queries/settingsRole.query.ts'
import { useSettingsUserUpdateMutation } from '@/modules/settings/features/users/api/mutations/settingsUserUpdate.mutation.ts'
import { useSettingsUserDetailQuery } from '@/modules/settings/features/users/api/queries/settingsUserDetail.query.ts'
import type { SettingsRoleUuid } from '@/modules/settings/models/role/settingsRoleUuid.model.ts'
import { toFormField } from '@/utils/formango.util.ts'

interface RoleItem {
  uuid: SettingsRoleUuid
  name: string
}

const props = defineProps<{
  userUuid: UserUuid
}>()

const emit = defineEmits<{
  close: []
}>()

const userUuid = computed<UserUuid>(() => props.userUuid)

const i18n = useI18n()
const toast = useVcToast()
const errorToast = useApiErrorToast()
const roleQuery = useSettingsRolesQuery()
const userDetailQuery = useSettingsUserDetailQuery(userUuid)
const userUpdateMutation = useSettingsUserUpdateMutation()

const isFetching = computed<boolean>(() => userDetailQuery.isFetching.value)
const user = computed<UserDetail | null>(() => userDetailQuery.data.value)

const roleItems = computed<RoleItem[]>(() => {
  return roleQuery.data.value ?? []
})

const form = useForm({
  initialState: () => ({
    roles: user.value?.roles.map((role) => ({
      uuid: role.uuid,
      name: role.name,
    })) ?? [],
  }),
  schema: userUpdateFormSchema,
  onSubmit: async (values) => {
    const result = await userUpdateMutation.execute({
      body: values.roles.map((role) => role.uuid),
      params: {
        userUuid: props.userUuid,
      },
    })

    result.match(
      () => {
        toast.success({
          testId: TEST_ID.USERS.UPDATE.SUCCESS_TOAST,
          title: i18n.t('module.user.update.success_toast.title'),
          description: i18n.t('module.user.update.success_toast.description', {
            user: user.value?.fullName,
          }),
        })
        emit('close')
      },
      (error) => {
        errorToast.show(error)
      },
    )
  },
  onSubmitError: () => {
    toast.error({
      title: i18n.t('toast.error.general_title'),
      description: i18n.t('error.invalid_form_input.description'),
    })
  },
})

const roles = form.register('roles')

function onClose(): void {
  emit('close')
}
</script>

<template>
  <FormDialog
    :form="form"
    :title="i18n.t('shared.users')"
    :description="i18n.t('shared.manage_users')"
    :data-test-id="TEST_ID.SETTINGS.FEATURES.USERS.DIALOG"
    teleport-target-id="settings-dialog"
    class="w-[40vw]"
    @close="onClose"
  >
    <template #header>
      <AppGroup
        align="center"
        gap="xl"
      >
        <VcAvatar
          v-if="!isFetching && user"
          :name="user.fullName"
          :test-id="TEST_ID.SETTINGS.FEATURES.USERS.AVATAR"
          class="size-14"
        />
        <AppSkeletonItem
          v-if="isFetching || !user"
          :shimmer="true"
          class="size-14 shrink-0 rounded-full"
        />
        <div>
          <h1 class="text-xs text-secondary">
            {{ i18n.t('shared.users') }}
          </h1>
          <p class="text-md font-semibold">
            {{ i18n.t('shared.manage_users') }}
          </p>
        </div>
      </AppGroup>
    </template>

    <template #form>
      <template v-if="user && !isFetching">
        <h1
          :data-test-id="TEST_ID.SETTINGS.FEATURES.USERS.NAME"
          class="font-semibold"
        >
          {{ user.fullName }}
        </h1>
        <p
          :data-test-id="TEST_ID.SETTINGS.FEATURES.USERS.EMAIL"
          class="text-sm text-fg-secondary"
        >
          {{ user.email }}
        </p>
        <AppSeparator
          direction="horizontal"
          class="my-4"
        />

        <FormGrid :cols="1">
          <VcSelect
            :test-id="TEST_ID.SETTINGS.FEATURES.USERS.ROLE_SELECT"
            v-bind="toFormField(roles)"
            :display-fn="(item) => item.name"
            :items="roleItems"
            :label="i18n.t('shared.roles')"
            is-required
          >
            <VcSelectItem
              v-for="role in roleItems"
              :key="role.uuid"
              :value="{ uuid: role.uuid, name: role.name }"
            >
              {{ role.name }}
            </VcSelectItem>
          </VcSelect>
        </FormGrid>
      </template>
      <AppSkeletonItem
        v-else
        :shimmer="true"
        class="h-36 w-full shrink-0 rounded-lg"
      />
    </template>

    <template #actions>
      <AppGroup class="flex w-full items-center gap-md">
        <VcButton
          class="flex-1"
          variant="secondary"
          @click="onClose"
        >
          {{ i18n.t('shared.cancel') }}
        </VcButton>

        <FormSubmitButton
          :form="form"
          :data-test-id="TEST_ID.SETTINGS.FEATURES.USERS.SUBMIT_BUTTON"
          :label="i18n.t('shared.save_changes')"
          variant="primary"
          class="flex-1"
        />
      </Appgroup>
    </template>
  </FormDialog>
</template>
