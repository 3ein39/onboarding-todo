import type { Component } from 'vue'
import type { RouteRecordRaw } from 'vue-router'

import { authMiddleware } from '@/middlewares/auth.middleware'
import { authRoutes } from '@/modules/auth'
import { contactRoutes } from '@/modules/contact'
import { todoRoutes } from '@/modules/todo'
import type { RoutesProccessed } from '@/types/global/vueRouter'

export const routes = [
  {
    path: '',
    component: (): Component => import('@/components/layout/dashboard/AppDashboardLayout.vue'),
    meta: {
      middleware: [
        authMiddleware,
      ],
    },
    children: [
      {
        name: 'index',
        path: '',
        redirect: {
          name: 'contact-overview',
        },
      },
      /**
       * Authenticated routes
       */
      ...contactRoutes,
      ...todoRoutes,
    ],
  },
  /**
   * Unauthenticated routes
   */
  ...authRoutes,
  {
    name: '404',
    path: '/:catchAll(.*)',
    redirect: {
      name: 'index',
    },
  },
] as const satisfies RouteRecordRaw[]

declare module '@wisemen/vue-core-components' {
  interface Routes extends RoutesProccessed {}
}
