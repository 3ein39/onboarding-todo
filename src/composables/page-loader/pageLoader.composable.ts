import {
  computed,
  ref,
} from 'vue'

const isLoading = ref<boolean>(false)

export function usePageLoader() {
  return {
    isLoading: computed<boolean>(() => isLoading.value),
    setIsLoading,
  }
}

function setIsLoading(value: boolean): void {
  isLoading.value = value
}
