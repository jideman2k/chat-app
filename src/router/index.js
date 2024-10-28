import { createRouter, createWebHistory } from "vue-router";
import Welcome from "../views/Welcome.vue";
import Chat from "../views/Chat.vue";
import { auth } from "../service/firebase/config";

const requireAuth = (to, from, next) => {
  let user = auth.currentUser;
  if (!user) {
    next({ name: "Welcome" });
  } else {
    next();
  }
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Welcome",
      component: Welcome,
    },
    {
      path: "/chat",
      name: "Chat",
      component: Chat,
      beforeEnter: requireAuth,
    },
  ],
});

export default router;
