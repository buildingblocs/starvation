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
                :src="`data:image/png;base64,${$store.state.user.pfp}`"
              />
          </v-avatar>
        </div>
          <v-list-item-title><span style="color: white; font-weight: bold;">{{ $store.state.user.fullname }}</span></v-list-item-title>
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
                Scroll down for more!
              </span>
            </v-toolbar-title>

            <!-- <v-btn v-if="!hideSubtitle" x-large color="primary" @onclick="scrollToMain()">
              Play now
            </v-btn> -->
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>

    <v-content v-if="$store.state.user != null">
      <router-view />
    </v-content>
    <v-content v-else :style="{ 'margin-top': height + 'px', minHeight: height + 'px' }">
      <v-container fluid fill-height fill-width align="center" justify="center" ref="onboarding">
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
                <v-row align="center" justify="center" class="my-6">
                  <v-btn x-large color="primary" @click="login('false')" v-if="$store.state.user == null">
                    Login with Google!
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
                    <v-col cols="12" sm="4">
                      <h3>Full Name</h3>
                      <v-text-field
                        x-large
                        v-model="fullname"
                        placeholder="Full Name"
                        required
                      ></v-text-field>
                      <v-spacer />
                    </v-col>
                  </v-row>
                  <v-row align="center" justify="center" class="ma-4">
                    <v-col cols="12" sm="4">
                      <h3>School</h3>
                      <v-text-field
                        x-large
                        v-model="school"
                        placeholder="School"
                        required
                      ></v-text-field>
                      <v-spacer />
                    </v-col>
                  </v-row>
                </v-form>
                <v-row align="center" justify="center" class="my-6">
                  <v-btn x-large color="primary" :disabled="username=='' || fullname==''"
                  @click="create()" v-if="$store.state.user == null">
                    Register with Google
                  </v-btn>
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
            <v-card-text class="text-body-1">Login error; does the account exist?</v-card-text>
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
import {getBase64, createUser, checkLoggedIn, updateDetails, resolveLogin} from "@/api/api";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import GoogleSignInButton from "vue-google-identity-login-btn";
import { Player } from "./types/players";
import school_list from "../data/schools.json";

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
    school: "",
    fullname: "",
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
    async onGoogleAuthSuccess (jwtCredentials: string) {
      console.log(jwtCredentials);
      const profileData = JSON.parse( atob(jwtCredentials.split(".")[1]) );
      console.table(profileData);
      let pfp = (getBase64(profileData.picture));
      createUser(profileData.email, profileData.name, profileData.given_name, await pfp);
      this.$store.state.user = {
        id: profileData.email,
        fullname: profileData.name,
        username: profileData.given_name,
        school: "",
        about: "",
        pfp,
        score: 0,
        num_games: 0
      };
    },
    checkAvailability(input: string): boolean {
      return true;
    },
    scrollToMain() {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      this.$refs["onboarding"].scrollIntoView({ behavior: "smooth" });
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
    create() {
      sessionStorage.setItem("username", this.username);
      sessionStorage.setItem("school", this.school);
      sessionStorage.setItem("fullname", this.fullname);
      sessionStorage.setItem("creating", "1");
      this.login("true");
    },
    login(create: string) {
      sessionStorage.setItem("logging", "1");
      const currentLocation = window.location.origin;
      console.log(currentLocation);
      window.location.href = `http://starvation-api.buildingblocs.sg/login?next=${currentLocation}&create=${create}`;
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
        localStorage.removeItem("jwt");
        localStorage.removeItem("refresh");
        localStorage.removeItem("renew");
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

    // check logged in
    checkLoggedIn().then((resp) => {
      console.log(resp.data);
      if (resp.data.status) {
        if (sessionStorage.getItem("creating")) {
          const username = sessionStorage.getItem("username") ?? "";
          const fullname = sessionStorage.getItem("fullname") ?? "";
          const school = sessionStorage.getItem("school") ?? "";
          let player = resp.data.user as Player;
          player.username = username;
          player.fullname = fullname;
          player.school = school;
          updateDetails(player).then(() => {
            this.$store.state.user = player;
          });
        } else {
          this.$store.state.user = resp.data.user;
        }
        sessionStorage.clear();
      } else {
        if (sessionStorage.getItem("logging")) {
          const uri = window.location.search;
          const params = new URLSearchParams(uri);
          const code = params.get("code");
          console.log(code);
          if (code) {
              resolveLogin(code as string).then((resp) => {
                localStorage.setItem("jwt", resp.data.access_token);
                localStorage.setItem("refresh", resp.data.refresh_token);
                localStorage.setItem("renew", resp.data.renew);
                window.location.href = window.location.origin;
              });
          } else {
            sessionStorage.clear();
            this.showLoginError = true;
          }
        } else {
          sessionStorage.clear();
        }
      }
    });

    // if (this.getCookie("username") != "" && this.getCookie("password")) {
    //   this.username = this.getCookie("username");
    //   this.password = this.getCookie("password");
    //   this.login();
    // }
  }
});
</script>
