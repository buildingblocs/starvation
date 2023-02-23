<template>
  <v-app id="app">
    <v-navigation-drawer v-if="user != null" v-model="drawerShown" temporary app>
      <!-- <v-list-item> -->
    <v-img
      width="100%"
      src="https://cdn.vuetifyjs.com/images/cards/server-room.jpg"
    >
        <v-list-item-content class="pa-4">
          <div align="left">
            <v-avatar size="80">
              <img
                :src="user.profilePicture"
              />
          </v-avatar>
        </div>
          <v-list-item-title><span style="color: white; font-weight: bold;">{{ user.name }}</span></v-list-item-title>
        </v-list-item-content>
        </v-img>
      <!-- </v-list-item> -->

      <v-divider></v-divider>
      <v-list dense nav>
        <router-link
          v-for="item in routes"
          :to="item.route"
          @click="drawerShown = false"
          style="text-decoration: none; color: inherit;"
          :key="item.name"
        >
          <v-list-item link>
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>
                {{ item.name }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider />
        </router-link>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar v-if="user != null" app color="primary" dark>
      <v-app-bar-nav-icon v-if="user != null" @click="drawerShown = !drawerShown" />
      <v-toolbar-title>
        Starvation
      </v-toolbar-title>
      <v-switch
        v-model="$vuetify.theme.dark"
        color="orange"
        label="Dark Mode"
        style="margin: 15px 15px 0 20px; display: block"
      />
      <v-spacer></v-spacer>

      <v-btn elevation="0" color="primary" @click="user = user2" v-if="user == null">
        Login
      </v-btn>
      <v-btn elevation="0" color="primary" @click="user = user2" v-if="user == null">
        New Account
      </v-btn>
      <v-btn elevation="0" color="primary" @click="user = null" v-if="user != null">
        Logout
      </v-btn>
    </v-app-bar>
    <v-app-bar
      v-else
      app
      dense
      fixed
      dark
      shrink-on-scroll
      prominent
      fade-img-on-scroll
      :height="height"
      :src="backgroundImg"
      alt
      class="icon"
      :key="backgroundImg"
      :class="imgIsLoaded ? 'show, display' : 'display'"
      loading="lazy"
      @load="imgLoaded"
    >
      <v-container fill-width :fill-height="!hideSubtitle" fluid>
        <v-row align="center" justify="center">
          <v-col :align="hideSubtitle ? 'left' : 'center'" justify="center">
            <v-toolbar-title
              class="text-wrap"
              :style="{ padding: 0, color: 'white', 'font-weight': 500 }"
            >
              <span :style="{ 'font-size': Math.max((width < 333 ? 0.75 : 1) * font, 1) + 'em' }"
                >Starvation</span
              >
              <span
                v-if="!hideSubtitle"
                class="text-wrap"
                :style="{ 'font-size': Math.min(1, font) + 'em' }"
              >
                <br />
                A barrage of challenges. A need for strategy. A call for code. <br />
                <br />
              </span>
            </v-toolbar-title>
            <v-btn v-if="!hideSubtitle" x-large color="primary" href="#onboarding">
              Play now
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>

    <v-content v-if="user != null">
      <router-view />
    </v-content>
    <v-content v-else :style="{ 'margin-top': height + 'px', minHeight: height + 'px' }">
      <v-container fluid fill-height fill-width align="center" justify="center" id="onboarding">
        <v-row align="center" justify="center">
          <v-col align="center" justify="center" cols="24" sm="8">
            <span>
              <span style="font-size: 3em">Will you emerge a victor?</span>
              <br />
              (insert epic cool explosion description here)
              <br />
              Let the games begin.
              <br /><br />
            </span>
            <v-tabs grow center-active v-model="tab" background-color="transparent">
              <v-tab v-for="item in loginItems" :key="item">
                {{ item }}
              </v-tab>
            </v-tabs>
            <v-tabs-items v-model="tab">
              <v-tab-item :key="'Login'">
                <v-form ref="form" lazy-validation>
                  <v-row align="center" justify="center" class="ma-4">
                    <v-col cols="12" sm="4">
                      <h3>Username</h3>
                      <v-text-field
                        x-large
                        v-model="username"
                        placeholder="Username"
                        required
                      ></v-text-field>
                      <v-spacer />
                    </v-col>
                    <v-col cols="12" sm="4">
                      <h3>Password</h3>
                      <v-text-field
                        x-large
                        v-model="password"
                        placeholder="Password"
                        :type="showPassword ? 'text' : 'password'"
                        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                        @click:append="showPassword = !showPassword"
                        required
                      >
                      </v-text-field>
                    </v-col>
                  </v-row>
                </v-form>
                <v-row align="center" justify="center" class="my-6">
                  <v-btn x-large color="primary" @click="user = user2" v-if="user == null">
                    Login
                  </v-btn>
                </v-row>
              </v-tab-item>
              <v-tab-item :key="'Register'">
                <v-form ref="form" lazy-validation>
                  <v-row align="center" justify="center" class="ma-4">
                    <v-col cols="12" sm="4">
                      <h3>Username</h3>
                      <v-text-field
                        x-large
                        v-model="username"
                        placeholder="Username"
                        required
                      ></v-text-field>
                      <v-spacer />
                    </v-col>
                    <v-col cols="12" sm="4">
                      <h3>Password</h3>
                      <v-text-field
                        x-large
                        v-model="password"
                        placeholder="Password"
                        :type="showPassword ? 'text' : 'password'"
                        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                        @click:append="showPassword = !showPassword"
                        required
                      >
                      </v-text-field>
                    </v-col>
                  </v-row>
                </v-form>
                <v-row align="center" justify="center" class="my-6">
                  <v-btn x-large color="primary" @click="user = user2" v-if="user == null">
                    Register
                  </v-btn>
                </v-row>
              </v-tab-item>
            </v-tabs-items>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Vuex from "vuex";
import store from "@/plugins/vuex";
import users from "./data/users.json";

Vue.use(Vuex);


export default Vue.extend({
  name: "App",
  el: "#app",
  components: {},
  data: () => ({
    drawerShown: false,
    loginItems: ["Login", "Register"],
    username: "",
    password: "",
    backgroundImg:
      "https://images.unsplash.com/photo-1597407068889-782ba11fb621?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8ZGFyayUyMG1vdW50YWlufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=900&q=60",
    font: window.innerWidth < 1000 ? 3 * 0.75 : 3,
    showPassword: false,
    hideSubtitle: false,
    imgIsLoaded: false,
    tab: null,
    user: null,
    user2: users[1]
  }),
  methods: {
    onScroll() {
      if (window.scrollY > this.height * 0.7) {
        this.font = 1;
        this.hideSubtitle = true;
      } else {
        this.font = 3;
        this.hideSubtitle = false;
      }
      if (this.width < 1000) {
        this.font *= 0.75;
      }
    },
    imgLoaded() {
      this.imgIsLoaded = true;
    }
  },
  computed: {
    routes(): Array<{
      name: string;
      route: string;
      icon: string;
    }> {
      // Add routes here to correspond to router.ts
      return [
        {
          name: "Home",
          route: "/",
          icon: "mdi-home-variant"
        },
        {
          name: "Profile",
          route: "/profile",
          icon: "mdi-account"
        },
        {
          name: "Challenges",
          route: "/challenges",
          icon: "mdi-crown"
        }
      ];
    },
    height() {
      return window.innerHeight;
    },
    width() {
      return window.innerWidth;
    }
  },
  mounted() {
    window.addEventListener("scroll", this.onScroll);
  }
});
</script>
