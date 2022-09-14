import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RecruitmentsView from '../views/RecruitmentView.vue'
import DetailView from '../views/DetailView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import NewPostView from '../views/NewPostView.vue'
import ProfileView from '../views/ProfileView.vue'

import NewCategoryView from '../views/admin/category/NewView.vue'
import CategoryView from '../views/admin/category/View.vue'

import NewCompanyView from '@/views/admin/company/NewView.vue'
import CompanyView from '@/views/admin/company/View.vue'

import NewFieldView from '@/views/admin/field/NewView.vue'
import FieldView from '@/views/admin/field/View.vue'

import NewSkillView from '@/views/admin/skill/NewView.vue'
import SkillView from '@/views/admin/skill/View.vue'

import NewRecruitmentView from '@/views/admin/recruitment/NewView.vue'
import RecruitmentView from '@/views/admin/recruitment/View.vue'

import AdminView from '@/views/admin/View.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/recruitments',
      name: 'recruitments',
      component: RecruitmentsView
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
      component: AdminView,
      children: [
        {
          path: 'category',
          name: 'category-index',
          component: CategoryView
        },
        {
          path: 'category/new',
          name: 'category-new',
          component: NewCategoryView
        },
        {
          path: 'company',
          name: 'company-index',
          component: CompanyView
        },
        {
          path: 'company/new',
          name: 'company-new',
          component: NewCompanyView
        },
        {
          path: 'field',
          name: 'field-index',
          component: FieldView
        },
        {
          path: 'field/new',
          name: 'field-new',
          component: NewFieldView
        },
        {
          path: 'skill',
          name: 'skill-index',
          component: SkillView
        },
        {
          path: 'skill/new',
          name: 'skill-new',
          component: NewSkillView
        },
        {
          path: 'recruitment',
          name: 'recruitment-index',
          component: RecruitmentView
        },
        {
          path: 'recruitment/new',
          name: 'recruitment-new',
          component: NewRecruitmentView
        }
      ]
    },
  ]
})

export default router
