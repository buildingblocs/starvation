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
        <v-avatar size="200px" class="justify-center">
          <v-img
            :aspect-ratio="1"
            :width="250"
            :src="user.profilePicture"
            class="justify-center"
            cover
          ></v-img>
        </v-avatar>
      </div>
      <v-card-title class="justify-center">{{ user.name }}</v-card-title>


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
                  @click="user.about = tempAbout; editAbout = false"
              >
                  Save
              </v-btn>
            </div>
        </div>

      <v-combobox
        label="School"
        :items=schools
        :item-value=user.school
      ></v-combobox>
    </v-card>
    </v-layout>
  </v-container>
</v-flex>
</template>

<script lang="ts">
import Vue from "vue";

import school_list from "../data/schools.json";

import challenges from "../data/challenges.json";

import users from "../data/users.json";

import { timeAgo } from "@/util/datetime";

export default Vue.extend({
  name: "Profile",
  data: function () {
    return {
      user: users.filter(it => it.username == this.$route.params.username)[0],
      editAbout: false,
      tempAbout: "",
      schools: school_list,
      timeAgo: timeAgo,
      headers: [
        {text: "Challenge", value: "title"},
        {text: "Score", value: "score"},
        {text: "Last Updated", value: "lastUpdated"}],
      challenges:  challenges.filter(it => it.completed)
      // [
      //   {
      //     name: "Mission 0: Getting Started",
      //     score: 100,
      //     at: new Date(1676978364407)
      //   },
      //   {
      //     name: "Mission 1: Paging for Python!",
      //     score: 99,
      //     at: new Date(1677143957326)
      //   },
      //   {
      //     name: "Mission 2: Let's do this.",
      //     score: 14,
      //     at: new Date(1677151081207)
      //   },
      // ]//.map((item) => { item.time = timeAgo.format(item.at); })
    };
  },
  methods: {
        wordCount(text: string): number {
            var content = text;
            content = content.replace(/<\S[^><]*>/gi, "");
            return content.match(/\w+/g) ? (content.match(/\w+/g) || "").length : 0;
        },
  }
});

</script>
