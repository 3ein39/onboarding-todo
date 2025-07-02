import eslintVueConfig from '@wisemen/eslint-config-vue'
import oxlint from 'eslint-plugin-oxlint'
import playwright from 'eslint-plugin-playwright'

export default [
  ...(await eslintVueConfig),
  {
    ignores: [
      'public/mockServiceWorker.js',
      'src/client',
      'tests/.auth',
      'src/locales',
    ],
  },
  {
    ...playwright.configs['flat/recommended'],
    files: [
      'tests/**',
    ],
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: 'tests',
      },
    },
  },
  {
    rules: {
      '@intlify/vue-i18n/key-format-style': [
        'error',
        'snake_case',
        {
          splitByDots: true,
        },
      ],
      '@intlify/vue-i18n/no-dynamic-keys': 'off',
      '@intlify/vue-i18n/no-raw-text': 'off',
      'vuejs-accessibility/label-has-for': 'off',
    },
  },
  ...oxlint.buildFromOxlintConfigFile('./.oxlintrc.json'),

]
