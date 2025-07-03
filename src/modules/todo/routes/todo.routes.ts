import type { Component } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
export const todoRoutes = [
  {
    path: '/todos',
    children: [
      {
        name: 'todo-overview',
        path: '',
        component: (): Component => import('@/modules/todo/features/overview/views/TodoOverviewView.vue'),
      },
    ],
  },
] as const satisfies RouteRecordRaw[]
