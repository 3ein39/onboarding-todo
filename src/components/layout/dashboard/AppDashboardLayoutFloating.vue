<script setup lang="ts">
import { Primitive } from 'reka-ui'
import { RouterView } from 'vue-router'
</script>

<template>
  <div
    :style="{
      gridTemplateAreas: `
        'sidebar header'
        'sidebar content'
      `,
    }"
    class="
      grid h-dvh grid-cols-[auto_1fr] grid-rows-[auto_1fr] overflow-hidden
      bg-(--catskill-white)
    "
  >
    <Primitive
      :as-child="true"
      class="[grid-area:sidebar]"
    >
      <slot name="sidebar" />
    </Primitive>

    <Primitive
      :as-child="true"
      class="[grid-area:header]"
    >
      <slot name="header" />
    </Primitive>

    <div
      class="
        overflow-auto bg-primary
        [grid-area:content]
      "
    >
      <RouterView />
    </div>
  </div>
</template>
