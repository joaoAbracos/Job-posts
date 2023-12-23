import TaskPage from "../pages/TasksPage.vue";
import LoginPage from "../pages/LoginPage.vue";
import ForgotPassword from "../pages/ForgotPassword.vue";
import PasswordReset from "../pages/PasswordReset.vue";
import RegisterPage from "../pages/RegisterPage.vue";
import VerifyEmail from "../pages/VerifyEmail.vue";
import NotFoundPage from "../pages/errors/NotFoundErrorPage.vue";
import HomePage from "../pages/HomePage.vue";
import ConfirmedEmail from "../pages/ConfirmedEmail.vue"
import profileRoutes from "./ProfileRoutes/profileRoutes";
import postsRoutes from './postsRoutes/postsRoutes';

const routes = [
  {
    path: "/",
    component: HomePage,
    name: "home",
  },
  {
    path: "/tasks",
    component: TaskPage,
    name: "tasks",
    meta: {
      auth: true,
      role: 'person'
    },
  },
  {
    path: "/login",
    component: LoginPage,
    name: "login",
    meta: {
      guest: true,
    },
  },
  {
    path: "/register",
    component: RegisterPage,
    name: "register",
    meta: {
      guest: true,
    },
  },
  {
    path: "/forgot-password",
    component: ForgotPassword,
    name: "forgotPassword",
    meta: {
      guest: true,
    },
  },
  {
    path: "/password-reset/:id",
    component: PasswordReset,
    name: "passwordReset",
    meta: {
      guest: true,
    },
  },
  {
    path: "/verify",
    component: VerifyEmail,
    name: "verify",
    meta: {
      auth: true,
    },
  },
  {
    path: "/verify-email/:id/:token",
    component: ConfirmedEmail,
    name: "confirmedEmail",
    meta: {
      auth: true,
    },
  },
  {
    path: "/:notFound(.*)*",
    name: "error.404",
    component: NotFoundPage,
  },
  ...profileRoutes,
  ...postsRoutes
];

export default routes;
