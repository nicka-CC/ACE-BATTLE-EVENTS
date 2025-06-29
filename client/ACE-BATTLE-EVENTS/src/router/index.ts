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
import TeamRegisterSuccess from '../views/TeamRegisterSuccess.vue'
import TeamRegisterError from '../views/TeamRegisterError.vue'

// Admin Sub-views (placeholder components for now)
import AdminEventsAll from '../views/Admin/AdminEventsAll.vue'
import AdminEventsAdd from '../views/Admin/AdminEventsAdd.vue'
import AdminTeamsAll from "@/views/Admin/AdminTeamsAll.vue";
import AdminTeamsAdd from "@/views/Admin/AdminTeamsAdd.vue";
import AdminPlayerAll from "@/views/Admin/AdminPlayerAll.vue";
import AdminPlayersAdd from "@/views/Admin/AdminPlayersAdd.vue";
import AddTeamPage from "@/views/AddTeamPage.vue";
import AddCoinsPage from '../views/AddCoinsPage.vue'

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
        path: 'add-team',
        name: 'add-team',
        component: AddTeamPage
      },
      {
        path: 'add-coins',
        name: 'add-coins',
        component: AddCoinsPage
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
            path: 'teams/all',
            name: 'admin-teams-all',
            component: AdminTeamsAll
          },
          {
            path: 'teams/add',
            name: 'admin-teams-add',
            component: AdminTeamsAdd
          },
          {
            path: 'players/all',
            name: 'admin-players-all',
            component: AdminPlayerAll
          },
          {
            path: 'players/add',
            name: 'admin-players-add',
            component: AdminPlayersAdd
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
      {
        path: 'register-team/success',
        name: 'register-team-success',
        component: TeamRegisterSuccess
      },
      {
        path: 'register-team/error',
        name: 'register-team-error',
        component: TeamRegisterError
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