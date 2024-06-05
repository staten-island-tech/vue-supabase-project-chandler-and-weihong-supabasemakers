import { createRouter, createWebHistory } from "vue-router";
import signin from "../components/signin.vue";
import account from "../components/account.vue";
import signup from "../components/signup.vue";

const routes = [
  {
    path: "/signin",
    name: "singin",
    component: signin,
  },
  {
    path: "/account",
    name: "account",
    component: account,
  },
  {
    path: "/signup",
    name: "signup",
    component: signup,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
