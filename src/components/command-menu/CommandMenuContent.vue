<script setup lang="ts">
import { ListboxRoot } from 'reka-ui'

import { useInjectCommandMenuContext } from '@/components/command-menu/commandMenu.context'
import CommandMenuInput from '@/components/command-menu/CommandMenuInput.vue'
import CommandMenuResults from '@/components/command-menu/CommandMenuResults.vue'
import CommandMenuShortcutHints from '@/components/command-menu/CommandMenuShortcutHints.vue'

const {
  highlightedResultId,
} = useInjectCommandMenuContext()
</script>

<template>
  <div>
    <ListboxRoot @highlight="(e) => highlightedResultId = (e?.value as string) ?? null">
      <CommandMenuInput />
      <CommandMenuResults />
    </ListboxRoot>

    <CommandMenuShortcutHints />
  </div>
</template>
