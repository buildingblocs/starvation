<template>
<v-flex>
  <v-container fluid>
    <v-card grow class="pa-4 col-sm" height="100%" width="100%">
      <v-card-title>
        Leaderboard
      </v-card-title>
      <v-data-table
      :items-per-page="15"
      :headers="headers"
      :items="users"
      :footer-props="{showFirstLastPage: true, firstIcon: 'mdi-arrow-collapse-left', lastIcon: 'mdi-arrow-collapse-right'}"
      >
        <template v-slot:item.name="{ item }">
          <v-avatar :size="30" style="margin-right: 10pt;">
            <img
                :src="item.pfp"
              />
          </v-avatar>
          <a :href="`#/users/${item.username}`" style="color:#2A52BE">{{ item.name }}</a>
        </template>
        <template v-slot:item.rank="{ item }">
          {{ item.rank }}
        </template>
      </v-data-table>

    </v-card>
  </v-container>
</v-flex>
</template>

<script lang="ts">
import Vue from "vue";

import users from "../data/users.json";

export default Vue.extend({
  name: "Leaderboard",
  data() {
    return {
      users: users.map((it, index) => ({
        rank: index == 0 ? "🥇" : index == 1 ? "🥈" : index == 2 ? "🥉" : index+1,
        name: it.name,
        username: it.username,
        score: 300 - 20*index,
        pfp: it.profilePicture
      })),
      headers: [
          {text: "Rank", value: "rank"},
          {text: "Name", value: "name"},
          {text: "Score", value: "score"}]
    };
  },
  mounted() {
    console.log(this.users);
  }
});
</script>
