import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue'
import routerNames from './routerNames';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: {
      name: routerNames['AUTH.LOGIN']
    }
  },
  {
    path: '/auth',
    children: [
      {
        path: '/login',
        component: () => import('@/views/auth/Login.vue'),
        name: routerNames['AUTH.LOGIN'],
        meta: {
          layout: 'AuthLayout',
        }
      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
