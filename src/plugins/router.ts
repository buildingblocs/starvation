import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Main from "@/views/Main.vue";
import { default as Profile } from "@/views/Profile.vue";
import Challenges from "@/views/Challenge.vue";
import Leaderboard from "@/views/Leaderboard.vue";

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
    path: "/users/:username",
    component: Profile
  },
  {
    path: "/challenges",
    component: Challenges
  },
  {
    path: "/leaderboard",
    component: Leaderboard
  }
];

export default new VueRouter({
  routes
});
