import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Main from "@/views/Main.vue";
import { default as Profile } from "@/views/Profile.vue";
import Challenges from "@/views/Challenges.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    component: Main
  },
  {
    path: "/home",
    component: Main
  },
  {
    path: "/profile",
    component: Profile
  },
  {
    path: "/challenges",
    component: Challenges
  }
];

export default new VueRouter({
  routes
});
