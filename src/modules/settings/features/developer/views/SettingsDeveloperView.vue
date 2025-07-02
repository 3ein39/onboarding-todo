<script setup lang="ts">
import AppSeparator from '@/components/app/AppSeparator.vue'
import AppGrid from '@/components/app/grid/AppGrid.vue'
import SettingsDeveloperOneSignalForm from '@/modules/settings/features/developer/components/SettingsDeveloperOneSignalForm.vue'
import SettingsDeveloperTestNotificationForm from '@/modules/settings/features/developer/components/SettingsDeveloperTestNotificationForm.vue'
</script>

<template>
  <AppGrid
    :cols="1"
    class="p-xl"
  >
    <SettingsDeveloperTestNotificationForm />
    <AppSeparator direction="horizontal" />
    <SettingsDeveloperOneSignalForm />
  </AppGrid>
</template>
