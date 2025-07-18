import { authHandlers } from '@/mocks/handlers/auth.mock.ts'
import { googleApiHandlers } from '@/mocks/handlers/googleApi.mock.ts'
import { notificationHandlers } from '@/mocks/handlers/notification.mock.ts'
import { settingsRoleHandlers } from '@/mocks/handlers/roles.mock.ts'
import { userHandlers } from '@/mocks/handlers/user.mock.ts'

export const handlers = [
  ...authHandlers,
  ...notificationHandlers,
  ...userHandlers,
  ...settingsRoleHandlers,
  ...googleApiHandlers,
]
