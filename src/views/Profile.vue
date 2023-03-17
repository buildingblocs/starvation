<template>
  <v-flex>
  <v-container fluid>

    <v-layout wrap justify-space-around>
    <v-card grow class="pa-4 col-sm" height="100%" style="margin-right:10pt;">
      <v-card-title>
        Your Progress
      </v-card-title>
      <v-data-table
      :items-per-page="15"
      :headers="headers"
      :items="challenges"
      :footer-props="{showFirstLastPage: true, firstIcon: 'mdi-arrow-collapse-left', lastIcon: 'mdi-arrow-collapse-right'}"
      >
        <template v-slot:item.lastUpdated="{ item }">
          <span>{{ timeAgo.format(item.lastUpdated) }}</span>
        </template>
        <template v-slot:item.title="{ item }">
          <a :href="`#/challenges/${item.id}`" style="color:#2A52BE">Mission {{ item.id }} - {{ item.title }}</a>
        </template>
      </v-data-table>
    </v-card>
    <v-card class="mx-auto pa-4" height="100%" width="360px" >
      <div align="center">
        <image-input v-model="avatar" :enabled="$store.state.user.username == $route.params.username">
          <div slot="activator">
            <v-avatar v-ripple size="200px" class="justify-center">
              <v-img
                :aspect-ratio="1"
                :width="250"
                :src="`data:image/png;base64,${user.pfp}`"
                class="justify-center"
                cover
                alt="Click to select avatar"
              ></v-img>
            </v-avatar>
          </div>
        </image-input>
      </div>
      <v-card-title class="justify-center">{{ user.fullname }}</v-card-title>
      <v-card-subtitle class="justify-center">@{{ user.username }}</v-card-subtitle>
        <div v-if="!editAbout || $store.state.user.username != $route.params.username">
          <v-card-text>
            {{ user.about  ? user.about : "No About Me Inserted" }}
          </v-card-text>
          <div align="right">
            <v-btn small
                v-if="$store.state.user.username == $route.params.username"
                append-icon="mdi-magnify"
                color="primary"
                style="font-size:10pt;"
                @click="tempAbout = user.about; editAbout = true"
            >
                Edit
            </v-btn>
            </div>
        </div>
        <div v-else>
            <v-textarea
                clearable
                auto-grow
                v-model = "tempAbout"
                clear-icon="mdi-close-circle"
                label="About Me" variant="underlined"
                value="This is clearable text."
                class="ml-0"
                style="font-size:10pt"
            ></v-textarea>
            <div align="right">
              <span style="font-size:10pt; margin-top:0pt">{{ wordCount(tempAbout) }} words written</span><br>
              <v-btn small
                  prepend-icon="mdi-magnify"
                  color="primary"
                  style="font-size:10pt;"
                  @click="user.about = tempAbout; editAbout = false; updateDetails()"
              >
                  Save
              </v-btn>
            </div>
        </div>

      <v-combobox
        label="School"
        v-model="user.school"
        :items=schools
        :disabled="user.username != $store.state.user.username"
        @change="updateDetails()"
      ></v-combobox>

      <v-btn block outlined color="error" @click="deleteUser()"
        v-if="$store.state.user.username == $route.params.username">Delete Account</v-btn>
    </v-card>
    </v-layout>
  </v-container>
</v-flex>
</template>

<script lang="ts">
import Vue from "vue";

import school_list from "../data/schools.json";

import challenges from "../data/challenges.json";

import { timeAgo } from "@/util/datetime";
import { getPlayers } from "@/api/api";
import { Player } from "@/types/players";
import { updateDetails, deleteAccount } from "@/api/api";
import ImageInput from "@/components/ImageInput.vue";

export default Vue.extend({
  name: "Profile",
  components: {
    ImageInput: ImageInput
  },

  data: function () {
    return {
      users: Array<Player>(),
      user: {
        id: "", fullname: "", score: 0,
        num_games: 0, about: "", school: "",
        pfp: "", username: ""
      },
      avatar: {image : ""},
      saved: true,
      editAbout: false,
      tempAbout: "",
      schools: school_list,
      timeAgo: timeAgo,
      headers: [
        {text: "Challenge", value: "title"},
        {text: "Score", value: "score"},
        {text: "Last Solved", value: "lastUpdated"}],
      challenges:  challenges.filter(it => it.completed)
    };
  },
  watch:{
    avatar: {
      handler: function() {
        // url in this.avatar.image
        if(this.avatar !== null) this.user.pfp = this.avatar.image;
        console.log(this.user);
        updateDetails(this.user);
        this.$store.state.user.pfp = this.avatar.image;
      },
      deep: true
    }
  },
  methods: {
    wordCount(text: string): number {
      let content = text;
      content = content.replace(/<\S[^><]*>/gi, "");
      return content.match(/\w+/g) ? (content.match(/\w+/g) || "").length : 0;
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
    updateDetails() {
      updateDetails(this.user);
      this.$store.state.user = this.user;
    },
    deleteUser() {
      deleteAccount(this.user.id);
      localStorage.removeItem("jwt");
      localStorage.removeItem("refresh");
      localStorage.removeItem("renew");
      this.$store.state.user = null;
    }
  },
  async mounted() {
    this.user = (await getPlayers()).filter(it => it.username = this.$route.params.username)[0];
    this.avatar.image = this.user.pfp;
  }
});

</script>
