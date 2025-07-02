import { defineComponentVariant } from '@wisemen/vue-core-components'

export const inputFieldKeyboardShortcut = defineComponentVariant({
  config: {
    keyboardKey: {
      key: 'bg-secondary border border-tertiary shadow-none',
    },
  },
  target: {
    prop: 'variant',
    value: 'input-field',
  },
  theme: 'default',
  component: 'keyboardShortcut',
})
