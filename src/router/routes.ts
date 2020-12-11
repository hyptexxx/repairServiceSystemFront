import { RouteConfig } from 'vue-router'
import AuthService from 'src/service/AuthService'
import LoginLayout from 'layouts/LoginLayout.vue'
import Login from 'pages/Login.vue'
import MainLayout from 'layouts/MainLayout.vue'

const authService = new AuthService()

const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'main',
    component: MainLayout,
    // beforeEnter: authService.checkLoggedIn
  },
  {
    path: '/login',
    component: LoginLayout,
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
