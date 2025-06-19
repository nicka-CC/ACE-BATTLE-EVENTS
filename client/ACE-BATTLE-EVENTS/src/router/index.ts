import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import MainLayout from '../layouts/MainLayout.vue'
import AuthLayout from '../layouts/AuthLayout.vue'
import HomePage from '../views/HomePage.vue'
import AdminPanel from '../views/AdminPanel.vue'
import ContactsPage from '../views/ContactsPage.vue'
import LoginPage from '../views/Auth/LoginPage.vue'
import RegisterPage from '../views/Auth/RegisterPage.vue'
import NotFoundPage from '../views/NotFoundPage.vue'

// Admin Sub-views (placeholder components for now)
import AdminEventsAll from '../views/Admin/AdminEventsAll.vue'
import AdminEventsAdd from '../views/Admin/AdminEventsAdd.vue'
import AdminClubs from '../views/Admin/AdminClubs.vue'
import AdminTeams from '../views/Admin/AdminTeams.vue'
import AdminPlayers from '../views/Admin/AdminPlayers.vue'

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
        meta: { requiresAuth: true },
        children: [
          {
            path: '',
            name: 'admin-home',
            redirect: { name: 'admin-events-all' } // Redirect to 'See all events' by default
          },
          {
            path: 'events/all',
            name: 'admin-events-all',
            component: AdminEventsAll
          },
          {
            path: 'events/add',
            name: 'admin-events-add',
            component: AdminEventsAdd
          },
          {
            path: 'clubs',
            name: 'admin-clubs',
            component: AdminClubs
          },
          {
            path: 'teams',
            name: 'admin-teams',
            component: AdminTeams
          },
          {
            path: 'players',
            name: 'admin-players',
            component: AdminPlayers
          }
        ]
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
    component: MainLayout,
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
      },
      // Маршрут 404, использующий AuthLayout
      {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: NotFoundPage
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