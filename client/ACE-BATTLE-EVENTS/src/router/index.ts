import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import MainLayout from '../layouts/MainLayout.vue'
import AuthLayout from '../layouts/AuthLayout.vue'
import HomePage from '../views/HomePage.vue'
import AdminPanel from '../views/AdminPanel.vue'
import ContactsPage from '../views/ContactsPage.vue'
import LoginPage from '../views/Auth/LoginPage.vue'
import RegisterPage from '../views/Auth/RegisterPage.vue'

const routes: RouteRecordRaw[] = [
  // Основные маршруты приложения, использующие MainLayout
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'home',
        component: HomePage
      },
      {
        path: 'admin-panel',
        name: 'admin',
        component: AdminPanel,
        meta: { requiresAuth: true }
      },
      {
        path: 'contacts',
        name: 'contacts',
        component: ContactsPage
      }
    ]
  },
  // Маршруты авторизации и регистрации, использующие AuthLayout
  {
    path: '/',
    component: AuthLayout,
    children: [
      {
        path: 'login',
        name: 'login',
        component: LoginPage
      },
      {
        path: 'register',
        name: 'register',
        component: RegisterPage
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !localStorage.getItem('userToken')) {
    next({ name: 'login' });
  } else {
    next();
  }
});

export default router 