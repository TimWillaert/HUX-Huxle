import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../components/LandingPage.vue"),
    },
    {
      path: "/:id",
      name: "play",
      component: () => import("../components/PlayHuxle.vue"),
    },
    {
      path: "/create",
      name: "create",
      component: () => import("../components/CreateHuxle.vue"),
    },
  ],
});

export default router;
