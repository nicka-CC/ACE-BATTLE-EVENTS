import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '../layouts/MainLayout.vue'
import HomePage from '../views/HomePage.vue'
import AdminPanel from '../views/AdminPanel.vue'
import ContactsPage from '../views/ContactsPage.vue'

const routes = [
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
        component: AdminPanel
      },
      {
        path: 'contacts',
        name: 'contacts',
        component: ContactsPage
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router 