import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DetailView from '../views/DetailView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import NewPostView from '../views/NewPostView.vue'
import ProfileView from '../views/ProfileView.vue'

import NewCategoryView from '../views/admin/category/NewCategoryView.vue'
import CategoryView from '../views/admin/category/CategoryView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/posts/:id',
      name: 'post-detail',
      component: DetailView
    },
    {
      path: '/new',
      name: 'new-post',
      component: NewPostView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView
    },
    {
      path: '/admin',
      name: 'admin',
      children: [
        {
          path: 'category',
          name: 'category',
          children: [
            {
              path: '',
              name: 'index',
              component: CategoryView
            },
            {
              path: 'new',
              name: 'new',
              component: NewCategoryView
            }
          ]
        }
      ]
    },
  ]
})

export default router
