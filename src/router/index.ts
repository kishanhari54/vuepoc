import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        component: () => import("../modules/dashboard/views/DashboardView.vue"),
      },
      {
        path: "master/process",
        name: "process",
        component: () =>
          import("../modules/masters/process/view/MasterProcessesView.vue"),
      },
      {
        path: "master/plants",
        name: "plants",
        component: () =>
          import("../modules/masters/plants/view/MasterPlantsView.vue"),
      },
      /*{
        path: "/masters",
        name: "masters",
        component: () => import("../modules/masters/view/MastersHome.vue"),
        children: [
          {
            path: "/process",
            name: "process",
            component: () =>
              import("../modules/masters/process/view/MasterProcessesView.vue"),
          },
        ],
      },*/
    ],
  },
  {
    path: "/login",
    name: "login",
    component: import(
      /* webpackChunkName: "login" */ "../modules/login/LoginView.vue"
    ),
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
