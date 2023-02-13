import Vue from "vue";
import VueRouter, {RouteConfig} from "vue-router";
import Main from "@/views/Main.vue";
import {default as Profile} from "@/views/Profile.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/:user",
    component: Main,
  },
  {
    path: "/home",
    component: Main,
  },
  {
    path: "/profile",
    component: Profile
  }
];

export default new VueRouter({
  routes,
});
