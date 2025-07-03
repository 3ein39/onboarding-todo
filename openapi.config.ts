import { defineConfig } from '@hey-api/openapi-ts'

export default defineConfig({
  input: 'https://onboarding-todo.internal.appwi.se/api/docs-json',
  output: 'src/client',
  plugins: [
    'zod',
    {
      name: '@hey-api/client-fetch',
      throwOnError: true,
    },
    {
      name: '@hey-api/sdk',
      auth: false,
      validator: true,
    },
    {
      name: '@hey-api/typescript',
      enums: 'typescript',
    },
  ],
})
