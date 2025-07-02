import { defineComponentVariant } from '@wisemen/vue-core-components'

export const unstyledButtonVariant = defineComponentVariant({
  config: {
    root: 'p-0 shadow-none border-none h-auto disabled:text-disabled text-primary',
  },
  target: {
    prop: 'variant',
    value: 'unstyled',
  },
  component: 'button',
})

export const xsButtonVariant = defineComponentVariant({
  config: {
    iconLeft: 'size-4 mr-xs',
    iconRight: 'size-4 ml-xs',
    root: 'text-sm h-8 px-lg',
  },
  target: {
    prop: 'size',
    value: 'xs',
  },
  component: 'button',
})
