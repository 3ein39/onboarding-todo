import type { MaybeRefOrGetter } from 'vue'
import {
  readonly,
  ref,
  toValue,
  watch,
} from 'vue'

const templateRef = ref<string>('{title}')

function setTemplate(template: string): void {
  if (!template.includes('{title}')) {
    throw new Error('Template must include {title}')
  }

  templateRef.value = template
}

export function useDocumentTitle() {
  const documentTitle = ref<string>(document.title)

  function setDocumentTitle(title: MaybeRefOrGetter<string>): void {
    watch(() => toValue(title), (titleValue) => {
      documentTitle.value = titleValue
    }, {
      immediate: true,
    })
  }

  watch(
    documentTitle,
    (documentTitle) => {
      document.title = templateRef.value.replace('{title}', documentTitle)
    },
    {
      immediate: true,
    },
  )

  return {
    title: readonly(documentTitle),
    set: setDocumentTitle,
    setTemplate,
  }
}
