import { createRouter, createWebHistory } from "vue-router";
import Welcome from "../views/Welcome.vue";
import Chat from "../views/Chat.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "welcome",
      component: Welcome,
    },
    {
      path: "/chat",
      name: "chat",
      component: Chat,
    },
  ],
});

export default router;
