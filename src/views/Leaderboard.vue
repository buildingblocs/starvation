<template>
  <v-flex>
    <v-container fluid>
      <v-card grow class="pa-4 col-sm" height="100%" width="100%">
        <v-card-title>
          Leaderboard
        </v-card-title>
        <v-data-table :items-per-page="15" 
        :headers="headers" 
        :items="users"
        :footer-props="{ showFirstLastPage: true, firstIcon: 'mdi-arrow-collapse-left', lastIcon: 'mdi-arrow-collapse-right' }"
        :item-class="colourRows">
          <template v-slot:item.name="{ item }">
            <v-avatar size="30px" class="justify-center me-2">
                <v-img 
                :aspect-ratio="1" 
                :width="50" 
                :src="item.picture" 
                class="justify-center" 
                ></v-img>
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
import store from "@/plugins/vuex";

export default Vue.extend({
  name: "Leaderboard",
  data() {
    return {
      users: users.sort((a, b) => {
        return a.score === b.score ? a.name.localeCompare(b.name) : b.score - a.score;
      }).map((it, index) => ({
        rank: index + 1,
        name: it.name,
        username: it.username,
        score: it.score,
        picture: it.profilePicture
      })),
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
      if (item.rank == 1) s.push("gold--text");
      else if (item.rank == 2) s.push("silver--text");
      else if (item.rank == 3) s.push("bronze--text");
      return s.join(" ");
    }
  },
  mounted() {
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
}

.you {
  background-color: #ff990060;
  &:hover {
    background-color: #dd9d3d60 !important;
  }
}
</style>
