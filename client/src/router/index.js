import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import RecruitmentsView from "../views/RecruitmentView.vue";
import DetailView from "../views/DetailView.vue";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import NewPostView from "../views/NewPostView.vue";
import ProfileView from "../views/ProfileView.vue";

import NewCategoryView from "../views/admin/category/NewView.vue";
import CategoryView from "../views/admin/category/View.vue";

import NewCompanyView from "@/views/admin/company/NewView.vue";
import CompanyView from "@/views/admin/company/View.vue";

import NewFieldView from "@/views/admin/field/NewView.vue";
import FieldView from "@/views/admin/field/View.vue";

import NewSkillView from "@/views/admin/skill/NewView.vue";
import SkillView from "@/views/admin/skill/View.vue";

import NewRecruitmentView from "@/views/admin/recruitment/NewView.vue";
import RecruitmentView from "@/views/admin/recruitment/View.vue";
import ApplyOfView from "@/views/admin/recruitment/ViewOf.vue";

import AdminNewPostView from "@/views/admin/post/NewView.vue";
import PostView from "@/views/admin/post/View.vue";

import AdminNewAnswerView from "@/views/admin/answer/NewView.vue";
import AnswerView from "@/views/admin/answer/View.vue";
import AnswerOfView from "@/views/admin/answer/ViewOf.vue";

import AdminView from "@/views/admin/View.vue";
import AdminDashboardView from "@/views/admin/dashboard/View.vue";

import RecruiterNewPostView from "@/views/recruiter/post/NewView.vue";
import RecruiterPostView from "@/views/recruiter/post/View.vue";

import RecruiterNewRecruitmentView from "@/views/recruiter/recruitment/NewView.vue";
import RecruiterRecruitmentView from "@/views/recruiter/recruitment/View.vue";

import RecruiterView from "@/views/recruiter/View.vue";
import RecruiterDashboardView from "@/views/recruiter/dashboard/View.vue";

import { useAuthStore } from "@/stores/auth/auth";

import { createToast } from "mosha-vue-toastify";

function isAuth() {
  const authStore = useAuthStore();
  if (authStore.token == null || authStore.user == null) {
    createToast("Please login to continue", { type: "info" });
    return "/login";
  }
  return true;
}

// Need backend validation as well
function isAdmin() {
  const authStore = useAuthStore();
  console.log(authStore.token, authStore.user);
  if (
    authStore.token == null ||
    authStore.user == null ||
    authStore.user.role !== "admin"
  ) {
    createToast("Please login to admin to continue", { type: "info" });
    return "/login";
  }
  return true;
}

// Need backend validation as well
function isRecruiter() {
  const authStore = useAuthStore();
  if (
    authStore.token == null ||
    authStore.user == null ||
    (authStore.user.role !== "recruiter" && authStore.user.role !== "admin")
  ) {
    createToast("Please login to recruiter account", { type: "info" });
    return "/login";
  }
  return true;
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/recruitments",
      name: "recruitments",
      component: RecruitmentsView,
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/posts/:id",
      name: "post-detail",
      component: DetailView,
    },
    {
      path: "/new",
      name: "new-post",
      component: NewPostView,
    },
    {
      path: "/recruitments/:id",
      name: "recruitment-detail",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/RecruitmentDetailView.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/register",
      name: "register",
      component: RegisterView,
    },
    {
      path: "/profile",
      name: "profile",
      component: ProfileView,
    },
    {
      path: "/admin",
      name: "admin",
      component: AdminView,
      beforeEnter: [isAdmin],
      children: [
        {
          path: "dashboard",
          name: "admin-dashboard",
          component: AdminDashboardView,
        },
        {
          path: "categories",
          name: "category-index",
          component: CategoryView,
        },
        {
          path: "categories/new",
          name: "category-new",
          component: NewCategoryView,
        },
        {
          path: "companies",
          name: "company-index",
          component: CompanyView,
        },
        {
          path: "companies/new",
          name: "company-new",
          component: NewCompanyView,
        },
        {
          path: "fields",
          name: "field-index",
          component: FieldView,
        },
        {
          path: "fields/new",
          name: "field-new",
          component: NewFieldView,
        },
        {
          path: "skills",
          name: "skill-index",
          component: SkillView,
        },
        {
          path: "skills/new",
          name: "skill-new",
          component: NewSkillView,
        },
        {
          path: "recruitments",
          name: "recruitment-index",
          component: RecruitmentView,
        },
        {
          path: "recruitments/new",
          name: "recruitment-new",
          component: NewRecruitmentView,
        },
        {
          path: "recruitment/:refId",
          name: "applies-of-recruitment",
          component: ApplyOfView,
        },
        {
          path: "posts",
          name: "post-index",
          component: PostView,
        },
        {
          path: "posts/new",
          name: "post-new",
          component: AdminNewPostView,
        },
        {
          path: "answers",
          name: "answer-index",
          component: AnswerView,
        },
        {
          path: "answers/new",
          name: "answer-new",
          component: AdminNewAnswerView,
        },
        {
          path: "answers/:postId",
          name: "answer-of-post",
          component: AnswerOfView,
        },
      ],
    },
    {
      path: "/recruiter",
      name: "recruiter",
      component: RecruiterView,
      beforeEnter: [isRecruiter],
      children: [
        {
          path: "dashboard",
          name: "recruiter-dashboard",
          component: RecruiterDashboardView,
        },
        {
          path: "posts",
          name: "recruiter-post-index",
          component: RecruiterPostView,
        },
        {
          path: "posts/new",
          name: "recruiter-post-new",
          component: RecruiterNewPostView,
        },
        {
          path: "recruitments",
          name: "recruiter-recruitment-index",
          component: RecruiterRecruitmentView,
        },
        {
          path: "recruitments/new",
          name: "recruiter-recruitment-new",
          component: RecruiterNewRecruitmentView,
        },
      ],
    },
  ],
});

export default router;
