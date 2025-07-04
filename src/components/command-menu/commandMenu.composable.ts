import { useDebounce } from '@vueuse/core'
import type {
  ComputedRef,
  Ref,
} from 'vue'
import {
  computed,
  ref,
  watch,
} from 'vue'

import { useGlobalSearchIndexQuery } from '@/api/global-search/queries/globalSearchIndex.query'
import { GlobalSearchCollectionName } from '@/client'
import type { CommandMenuAction } from '@/components/command-menu/commandMenu.type'
import { CommandMenuCategory } from '@/components/command-menu/commandMenu.type'
import { useCommandMenuActions } from '@/components/command-menu/commandMenuActions.composable'
import type { GlobalSearchIndex } from '@/models/global-search/globalSearchIndex.model'

interface UseCommandMenu {
  isLoadingResults: ComputedRef<boolean>
  results: ComputedRef<CommandMenuAction[]>
  searchTerm: Ref<string>
}

function globalSearchCollectionNameToCategory(
  collectionName: GlobalSearchCollectionName,
): CommandMenuCategory {
  switch (collectionName) {
    case GlobalSearchCollectionName.USER:
      return CommandMenuCategory.USER
    default:
      return CommandMenuCategory.USER
  }
}

export function useCommandMenu(): UseCommandMenu {
  const searchTerm = ref<string>('')
  const debouncedSearchTerm = useDebounce(searchTerm, 100)

  const localActions = useCommandMenuActions()

  const globalSearchIndexQuery = useGlobalSearchIndexQuery(
    computed<string>(() => debouncedSearchTerm.value),
  )

  const globalSearchItems = computed<GlobalSearchIndex[]>(() => globalSearchIndexQuery.data.value ?? [])

  const actions = ref<CommandMenuAction[]>([])

  const filteredLocalActions = computed<CommandMenuAction[]>(() => {
    const search = searchTerm.value.toLowerCase()

    if (search.length === 0) {
      return []
    }

    return localActions.value
      .filter((result) => {
        return !result.isHidden && result.keywords.some((keyword) => {
          return keyword.toLowerCase().includes(search)
        })
      })
  })

  watch(globalSearchItems, (items) => {
    const apiResults = items.map((item) => {
      return {
        id: item.entity.uuid,
        breadcrumbs: [],
        category: globalSearchCollectionNameToCategory(item.entity.type),
        icon: 'user',
        keywords: [],
        label: item.entity.name,
        onSelect: () => {
          // Currently only USER entities are supported
          // Add navigation logic here if needed
        },
      } as CommandMenuAction
    })

    actions.value = [
      ...filteredLocalActions.value,
      ...apiResults,
    ].slice(0, 10)
  })

  return {
    isLoadingResults: computed<boolean>(() => globalSearchIndexQuery.isLoading.value),
    results: computed<CommandMenuAction[]>(() => actions.value),
    searchTerm,
  }
}
