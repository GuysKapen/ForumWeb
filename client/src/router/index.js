import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import SavedView from "@/views/SavedView.vue";
import RecruitmentsView from "../views/RecruitmentView.vue";
import DetailView from "../views/DetailView.vue";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import NewPostView from "../views/NewPostView.vue";
import ProfileView from "../views/ProfileView.vue";

import NewCategoryView from "../views/admin/category/NewView.vue";
import EditCategoryView from "../views/admin/category/EditView.vue";
import CategoryView from "../views/admin/category/View.vue";

import NewCompanyView from "@/views/admin/company/NewView.vue";
import EditCompanyView from "@/views/admin/company/EditView.vue";
import CompanyView from "@/views/admin/company/View.vue";

import NewFieldView from "@/views/admin/field/NewView.vue";
import EditFieldView from "@/views/admin/field/EditView.vue";
import FieldView from "@/views/admin/field/View.vue";

import NewSkillView from "@/views/admin/skill/NewView.vue";
import EditSkillView from "@/views/admin/skill/EditView.vue";
import SkillView from "@/views/admin/skill/View.vue";

import NewRecruitmentView from "@/views/admin/recruitment/NewView.vue";
import EditRecruitmentView from "@/views/admin/recruitment/EditView.vue";
import RecruitmentView from "@/views/admin/recruitment/View.vue";
import ApplyOfView from "@/views/admin/recruitment/ViewOf.vue";

import AdminNewPostView from "@/views/admin/post/NewView.vue";
import EditPostView from "@/views/admin/post/EditView.vue";
import PostView from "@/views/admin/post/View.vue";

import AdminNewAnswerView from "@/views/admin/answer/NewView.vue";
import AdminEditAnswerView from "@/views/admin/answer/EditView.vue";
import AnswerView from "@/views/admin/answer/View.vue";
import AnswerOfView from "@/views/admin/answer/ViewOf.vue";

import AdminView from "@/views/admin/View.vue";
import AdminDashboardView from "@/views/admin/dashboard/View.vue";

import AdminUsersView from "@/views/admin/user/View.vue";

import RecruiterNewPostView from "@/views/recruiter/post/NewView.vue";
import RecruiterEditPostView from "@/views/recruiter/post/EditView.vue";
import RecruiterPostView from "@/views/recruiter/post/View.vue";

import RecruiterNewRecruitmentView from "@/views/recruiter/recruitment/NewView.vue";
import RecruiterEditRecruitmentView from "@/views/recruiter/recruitment/EditView.vue";
import RecruiterRecruitmentView from "@/views/recruiter/recruitment/View.vue";

import RecruiterView from "@/views/recruiter/View.vue";
import RecruiterDashboardView from "@/views/recruiter/dashboard/View.vue";

import RecruiterApplyView from "@/views/recruiter/apply/View.vue";

import UserView from "@/views/user/View.vue";
import UserPostView from "@/views/user/post/View.vue";
import UserEditPostView from "@/views/user/post/EditView.vue";
import UserAnswerView from "@/views/user/answer/View.vue";
import UserEditAnswerView from "@/views/user/answer/EditView.vue";
import UserCommentView from "@/views/user/comment/View.vue";
import UserEditCommentView from "@/views/user/comment/EditView.vue";

import ChatView from "@/views/ChatView.vue";

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
      path: "/saved",
      name: "saved",
      component: SavedView,
      beforeEnter: [isAuth]
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
      beforeEnter: [isAuth]
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
      beforeEnter: [isAuth],
    },
    {
      path: "/chat",
      name: "chat",
      component: ChatView,
      beforeEnter: [isAuth],
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
          path: "users",
          name: "user-index",
          component: AdminUsersView,
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
          path: "categories/:id/edit",
          name: "category-edit",
          component: EditCategoryView,
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
          path: "companies/:id/edit",
          name: "company-edit",
          component: EditCompanyView,
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
          path: "fields/:id/edit",
          name: "field-edit",
          component: EditFieldView,
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
          path: "skills/:id/edit",
          name: "skill-edit",
          component: EditSkillView,
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
          path: "recruitments/:id/edit",
          name: "recruitment-edit",
          component: EditRecruitmentView,
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
          path: "posts/:id/edit",
          name: "post-edit",
          component: EditPostView,
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
          path: "answers/:id/edit",
          name: "answer-edit",
          component: AdminEditAnswerView,
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
          path: "posts/:id/edit",
          name: "recruiter-post-edit",
          component: RecruiterEditPostView,
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
        {
          path: "recruitments/:id/edit",
          name: "recruiter-recruitment-edit",
          component: RecruiterEditRecruitmentView,
        },
        {
          path: "applies",
          name: "recruiter-apply-index",
          component: RecruiterApplyView,
        },
      ],
    },
    {
      path: "/user",
      name: "user",
      component: UserView,
      beforeEnter: [isAuth],
      children: [
        {
          path: "posts",
          name: "user-post-index",
          component: UserPostView,
        },
        {
          path: "post/new",
          name: "user-post-new",
          component: AdminNewPostView,
        },
        {
          path: "post/:id/edit",
          name: "user-post-edit",
          component: UserEditPostView,
        },
        {
          path: "answers",
          name: "user-answer-index",
          component: UserAnswerView,
        },
        {
          path: "answers/:id/edit",
          name: "user-answer-edit",
          component: UserEditAnswerView,
        },
        {
          path: "comments",
          name: "user-comment-index",
          component: UserCommentView,
        },
        {
          path: "comments/:id/edit",
          name: "user-comment-edit",
          component: UserEditCommentView,
        },
      ],
    },
  ],
});

export default router;
