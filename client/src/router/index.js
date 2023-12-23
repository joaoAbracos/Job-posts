import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../stores/auth";
import routes from "../router/routes";

const ROUTE_NAMES = {
  login: "login",
  profileCompany: "profileCompany",
  profilePerson: "profilePerson",
  tasks: "tasks",
  error404: "error.404",
  verify: "verify",
};

const redirectTo = (name, query = {}) => {
  return {
    name,
    query,
  };
};

const checkAuth = (to, store) => {
  if (to.meta.auth && !store.isLoggedIn) {
    return redirectTo(ROUTE_NAMES.login);
  }
};
const checkEmailVerified = (to, store) => {
  if (
    to.meta.auth &&
    !store.user.email_verification &&
    to.name !== ROUTE_NAMES.verify &&
    store.hasProfile !== null
  ) {
    return redirectTo(ROUTE_NAMES.verify);
  }
};
const checkCompanyProfile = (to, store) => {
  if (
    store.isLoggedIn &&
    store.hasProfile === null &&
    to.name !== ROUTE_NAMES.profileCompany &&
    store.role === "company"
  ) {
    return redirectTo(ROUTE_NAMES.profileCompany);
  }
};

const checkPersonProfile = (to, store) => {
  if (
    store.isLoggedIn &&
    store.hasProfile === null &&
    to.name !== ROUTE_NAMES.profilePerson &&
    store.role === "person"
  ) {
    return redirectTo(ROUTE_NAMES.profilePerson);
  }
};

const checkGuest = (to, store) => {
  if (to.meta.guest && store.isLoggedIn) {
    return redirectTo(ROUTE_NAMES.tasks);
  }
};

const checkRole = (to, store) => {
  if (to.meta.role && to.meta.role !== store.role) {
    return redirectTo(ROUTE_NAMES.error404);
  }
};

const checkProfile = (to, store) => {
  if (
    (to.name == ROUTE_NAMES.profileCompany ||
      to.name == ROUTE_NAMES.profilePerson) &&
    store.hasProfile
  ) {
    return redirectTo(ROUTE_NAMES.tasks);
  }
};

const router = createRouter({
  routes,
  history: createWebHistory(),
  linkActiveClass: "bg-gray-900 text-gray-300",
});
router.beforeEach(async (to, from) => {
  const store = useAuthStore();
  await store.fetchUser();
  return (
    checkAuth(to, store) ||
    checkEmailVerified(to, store) ||
    checkCompanyProfile(to, store) ||
    checkPersonProfile(to, store) ||
    checkGuest(to, store) ||
    checkRole(to, store) ||
    checkProfile(to, store)
  );
});
export default router;
