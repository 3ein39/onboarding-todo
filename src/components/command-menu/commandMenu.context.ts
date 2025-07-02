import type {
  ComputedRef,
  Ref,
} from 'vue'

import type { CommandMenuResult } from '@/components/command-menu/commandMenu.type'
import { useContext } from '@/composables/context/context.composable'

interface CommandMenuContext {
  highlightedResultId: Ref<string | null>
  isLoadingResults: ComputedRef<boolean>
  results: ComputedRef<CommandMenuResult[]>
  searchTerm: Ref<string>
  onSelectResult: (result: CommandMenuResult) => void
}

export const [
  useProvideCommandMenuContext,
  useInjectCommandMenuContext,
] = useContext<CommandMenuContext>('commandMenuContext')
