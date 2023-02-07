<template>
  <v-app>
    <v-navigation-drawer
      v-if="user != null"
      v-model="drawerShown"
      temporary app>

      <v-list-item>
        <v-list-item-content>
          <v-icon size="100">mdi-account</v-icon>
          <v-list-item-title>
            Welcome, {{ user.name }}!
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>
      <v-list
        dense
        nav>
        <router-link v-for="item in routes"
                     :to="item.route"
                     @click="drawerShown = false"
                     style="text-decoration: none; color: inherit;"
                     :key="item.name">
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
          <v-divider/>
        </router-link>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-app-bar-nav-icon v-if="user != null"
                          @click="drawerShown = !drawerShown"/>
      <v-toolbar-title>
        TheVueProgrammer
      </v-toolbar-title>
      <v-switch v-model="$vuetify.theme.dark" color="orange" label="Dark Mode"
                style="margin: 15px 15px 0 20px; display: block"/>
    </v-app-bar>

    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "App",
  components: {},
  data: () => ({
    drawerShown: false,
    user: {
      name: "Prannaya",
    }
  }),
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
          icon: "mdi-home-variant",
        },
        {
          name: "GitHub",
          route: "/github",
          icon: "mdi-github",
        },
        {
          name: "ISS",
          route: "/iss",
          icon: "mdi-space-station",
        },
        {
          name: "Jokes!",
          route: "/jokes",
          icon: "mdi-code-not-equal-variant",
        },
        {
          name: "Quotes",
          route: "/quotes",
          icon: "mdi-format-quote-open",
        },
        {
          name: "News",
          route: "/news",
          icon: "mdi-newspaper",
        }
      ];
    },
  }
});
</script>
