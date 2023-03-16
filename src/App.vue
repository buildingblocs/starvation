<template>
  <v-app id="app">
    <v-navigation-drawer v-if="$store.state.user != null" v-model="drawerShown" temporary app>
      <!-- <v-list-item> -->
    <v-img
      width="100%"
      src="https://cdn.vuetifyjs.com/images/cards/server-room.jpg"
    >
        <v-list-item-content class="pa-4">
          <div align="left">
            <v-avatar size="80">
              <img
                :src="$store.state.user.profilePicture"
              />
          </v-avatar>
        </div>
          <v-list-item-title><span style="color: white; font-weight: bold;">{{ $store.state.user.name }}</span></v-list-item-title>
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
    <v-app-bar v-if="$store.state.user != null" app color="primary" dark>
      <v-app-bar-nav-icon v-if="$store.state.user != null" @click="drawerShown = !drawerShown" />
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

      <v-btn elevation="0" color="primary" @click="logout()" v-if="$store.state.user != null">
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

    <v-content v-if="$store.state.user != null">
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
                  <v-btn x-large color="primary" @click="login()" v-if="$store.state.user == null">
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
                        @input="checkAvailability"
                        required
                      ></v-text-field>
                      <v-spacer />
                    </v-col>
                    <!-- <v-col cols="12" sm="4">
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
                    </v-col> -->
                  </v-row>
                </v-form>
                <v-row align="center" justify="center" class="my-6">
                  <v-btn x-large color="primary" @click="login()" v-if="$store.state.user == null">
                    Register
                  </v-btn>
                  <div style="display: flex; justify-content: center"
                    id="google-login-btn"
                    v-google-identity-login-btn="{ clientId, locale:'en' }">
                      Register with Google
                  </div>
                </v-row>
              </v-tab-item>
            </v-tabs-items>
          </v-col>
        </v-row>
        <v-dialog
          v-model="showLoginError"
          persistent
          :width="500"
        >
          <v-card>
            <v-card-title class="text-h4">
              Login Error
            </v-card-title>
            <v-card-text class="text-body-1">Either your username or password is incorrect.</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                variant="text"
                @click="showLoginError = false"
              >
                Ok
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import users from "./data/users.json";
import {getBase64, createUser} from "@/api/api";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import GoogleSignInButton from "vue-google-identity-login-btn";

export default Vue.extend({
  name: "App",
  el: "#app",
  components: {},
  directives: {
    GoogleSignInButton
  },
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
    showLoginError: false,
    tab: null,
    clientId: "596255395612-2s6ld1u25tfcuefaiogu7jiorsj46e6i.apps.googleusercontent.com"
  }),
  methods: {
    onGoogleAuthSuccess (jwtCredentials: string) {
      console.log(jwtCredentials);
      const profileData = JSON.parse( atob(jwtCredentials.split(".")[1]) );
      console.table(profileData);

      console.log(getBase64(profileData.picture));
    },
    checkAvailability(input: string): boolean {
      return true;
    },
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
    },
    login() {
      const res = users.filter(it => it.username == this.username && it.password == this.password);
      if (res.length > 0) {
        this.$store.state.user = res[0];
        document.cookie = `username=${this.username};expires=Fri, 31 Dec 2100 12:00:00 UTC`;
        document.cookie = `password=${this.password};expires=Fri, 31 Dec 2100 12:00:00 UTC`;
      } else {
        this.showLoginError = true;
      }
    },
      getCookie(cname: string) {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(";");
        for(let i = 0; i <ca.length; i++) {
          let c = ca[i];
          while (c.charAt(0) == " ") {
            c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
          }
        }
        return "";
      },
      logout() {
        document.cookie = "username=;expires=Fri, 31 Dec 2100 12:00:00 UTC";
        document.cookie = "password=;expires=Fri, 31 Dec 2100 12:00:00 UTC";
        this.$store.state.user = null;
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
          route: `/users/${(this.$store.state.user || {username: ""}).username}`,
          icon: "mdi-account"
        },
        {
          name: "Challenges",
          route: "/challenges",
          icon: "mdi-crown"
        },
        {
          name: "Leaderboard",
          route: "/leaderboard",
          icon: "mdi-trophy-variant"
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

    if (this.getCookie("username") != "" && this.getCookie("password")) {
      this.username = this.getCookie("username");
      this.password = this.getCookie("password");
      this.login();
    }
  }
});
</script>
