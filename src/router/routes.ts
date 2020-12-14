import { RouteConfig } from 'vue-router'
import AuthService from 'src/service/AuthService'
import LoginLayout from 'layouts/LoginLayout.vue'
import Login from 'pages/Login.vue'
import MainLayout from 'layouts/MainLayout.vue'
import AdminLayout from 'layouts/AdminLayout.vue'

const authService = new AuthService()

const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'dafault',
    beforeEnter: authService.defaultRedirect
  },
  {
    path: '/request',
    name: 'main',
    component: MainLayout,
    beforeEnter: authService.checkNotLoggedInAtMain
  },
  {
    path: '/administration',
    name: 'administration',
    component: AdminLayout,
    beforeEnter: authService.checkNotLoggedInAtAdmin
  },
  {
    path: '/login',
    component: LoginLayout,
    name: 'login',
    beforeEnter: authService.checkNotLoggedIn,
    children: [
      { name: 'login', path: '', component: Login }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
