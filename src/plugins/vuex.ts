import Vue from "vue";
import Vuex from "vuex";

import {Player} from "@/types/players";

Vue.use(Vuex);

const store = new Vuex.Store({
  state(): {user: Player | null} {
    return {
      user: null
    };
  }
});

export default store;

