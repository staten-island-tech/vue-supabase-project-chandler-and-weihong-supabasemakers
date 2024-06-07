import { createRouter, createWebHistory } from "vue-router";
import SignUp from "../components/signup.vue";
import SignIn from "../components/signin.vue";
import Account from "../components/Account.vue";

const routes = [
  { path: "/signup", name: "signup", component: SignUp },
  { path: "/signin", name: "signin", component: SignIn },
  { path: "/account", name: "account", component: Account, props: true },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
