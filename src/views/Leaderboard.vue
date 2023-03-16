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
      :item-class="colourRows"
      >
        <template v-slot:item.name="{ item }">
          <v-avatar :size="30" style="margin-right: 10pt;"  class="justify-center me-2">
            <v-img
                :aspect-ratio="1"
                :width="50"
                :src="item.pfp"
                class="justify-center"
              />
          </v-avatar>
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
import {getPlayers} from "@/api/api";
import {Player} from "@/types/players";

export default Vue.extend({
  name: "Leaderboard",
  data() {
    return {
      users: Array<any>(),
      headers: [
        { text: "Rank", value: "rank" },
        { text: "Name", value: "name" },
        { text: "Score", value: "score" }]
    };
  },
  methods: {
    colourRows(item: any) {
      let s = [];
      if (item.username == this.$store.state.user.username) s.push("you");
      if (item.rank == "🥇") s.push("gold--text");
      else if (item.rank == "🥈") s.push("silver--text");
      else if (item.rank == "🥉") s.push("bronze--text");
      return s.join(" ");
    }
  },
  async mounted() {
    this.users = (await getPlayers()).sort((a, b) => {
        return a.score === b.score ? a.fullname.localeCompare(b.fullname) : (b.score ?? 0) - (a.score ?? 0);
      }).map((it, index) => ({
        rank: index == 0 ? "🥇" : index == 1 ? "🥈" : index == 2 ? "🥉" : index+1,
        name: it.username,
        username: it.username,
        score: it.score,
        pfp: `data:image/png;base64,${it.pfp}`
        // pfp: it.profilePicture
      }));
    console.log(this.users);
  }
});
</script>

<style lang="scss">
.gold--text td,
.silver--text td,
.bronze--text td {
  font-weight: bold;
}

a,
a:visited,
a:hover,
a:active {
  color: inherit !important;
  text-decoration:none;
}

.you {
  background-color: #ff990060;
  &:hover {
    background-color: #dd9d3d60 !important;
  }
}
</style>
