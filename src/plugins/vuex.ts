import Vue from "vue";
import Vuex from "vuex";

import {User} from "@/types/users";

Vue.use(Vuex);

const store = new Vuex.Store({
  state(): {user: User | null} {
    return {
      user: null
    };
  }
});

export default store;

