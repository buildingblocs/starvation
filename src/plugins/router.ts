import Vue from "vue";
import VueRouter, {RouteConfig} from "vue-router";
import Main from "@/views/Main.vue";
import Onboarding from "@/views/Onboarding.vue";
import {default as Profile} from "@/views/Profile.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    component: Main,
  },
  {
    path: "/home",
    component: Onboarding,
  },
  {
    path: "/profile",
    component: Profile
  }
];

export default new VueRouter({
  routes,
});
