import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DetailView from '../views/DetailView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import NewPostView from '../views/NewPostView.vue'
import ProfileView from '../views/ProfileView.vue'

import NewCategoryView from '../views/admin/category/NewView.vue'
import CategoryView from '../views/admin/category/View.vue'

import NewCompanyView from '@/views/admin/company/NewView.vue'
import CompanyView from '@/views/admin/company/View.vue'

// import NewFieldView from '@/views/admin/field/NewView.vue'
// import FieldView from '@/views/admin/field/View.vue'

import NewSkillView from '@/views/admin/skill/NewView.vue'
import SkillView from '@/views/admin/skill/View.vue'

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
        },
        {
          path: 'company',
          name: 'company',
          children: [
            {
              path: '',
              name: 'index',
              component: CompanyView
            },
            {
              path: 'new',
              name: 'new',
              component: NewCompanyView
            }
          ]
        },
        {
          path: 'field',
          name: 'field',
          children: [
            {
              path: '',
              name: 'index',
              component: FieldView
            },
            {
              path: 'new',
              name: 'new',
              component: NewSkillView
            }
          ]
        },
        {
          path: 'skill',
          name: 'skill',
          children: [
            {
              path: '',
              name: 'index',
              component: SkillView
            },
            {
              path: 'new',
              name: 'new',
              component: NewSkillView
            }
          ]
        }
      ]
    },
  ]
})

export default router
