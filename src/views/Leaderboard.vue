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
          <a :href="`#/users/${item.username}`" style="color:#2A52BE">{{ item.name }}</a>
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
        rank: index,
        name: it.name,
        username: it.username,
        score: 300
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
