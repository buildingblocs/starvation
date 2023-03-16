import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Main from "@/views/Main.vue";
import { default as Profile } from "@/views/Profile.vue";
import Challenges from "@/views/Challenges.vue";
import Leaderboard from "@/views/Leaderboard.vue";
import Challenge from "@/views/Challenge.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    component: Challenges
  },
  {
    path: "/users/:username",
    component: Profile
  },
  {
    path: "/leaderboard",
    component: Leaderboard
  },
  {
    path: "/challenges/:id",
    component: Challenge
  }
];

export default new VueRouter({
  routes
});
