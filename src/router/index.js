/*
 * @Descripttion: 
 * @version: 
 * @Author: shaye
 * @Date: 2023-03-08 18:54:45
 * @LastEditors: shaye
 * @LastEditTime: 2023-03-11 21:06:56
 */
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Layout',
    component: () => import('../components/layout.vue'),
    children: [{
      path: 'index',
      name: 'Index',
      component: () => import('../views/index/index.vue')
    }, {
      path: 'table',
      name: 'Table',
      component: () => import('../views/table.vue')
    }, {
      path: 'form',
      name: 'Form',
      component: () => import('../views/form.vue')
    }, {
      path: 'editor',
      name: 'Editor',
      component: () => import('../views/editor.vue')
    }]
  }, {
    path: '/login',
    name: 'Login',
    component: () => import('../components/login.vue'),
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
