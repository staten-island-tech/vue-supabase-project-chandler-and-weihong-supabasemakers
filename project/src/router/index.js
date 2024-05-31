import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import auth from "../components/auth.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'auth',
      component: auth
    },
  ]
})

export default router
