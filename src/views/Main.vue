<template>
  <v-flex>
  <v-container fluid>
    <ChartComponent/>
    <v-card class="pa-8" style="word-break: normal;">
      <v-card-title>
        Hello, {{ user.name }}
      </v-card-title>
    
    <br>
    <v-data-table
      v-model:items-per-page="itemsPerPage"
      :headers="headers"
      :items="stats"
      item-value="name"
      class="elevation-1"
    ></v-data-table>
    
    </v-card>
    <br>
    <v-card>
    <MainChartExample
                style="height: 300px; max-height: 300px; margin-top: 40px"
              />
    </v-card>
    <v-card>
      <v-card-text class="pa-8" style="word-break: normal;">
        {{ content }}
      </v-card-text>
      <v-card-text class="text-right pa-8">
        ~ {{ author }}
      </v-card-text>
      <v-spacer />
    </v-card>

  </v-container>
  </v-flex>
</template>

<script lang="ts">
import Vue from "vue";
import ChartComponent from "./ChartComponent.vue"
import school_list from "../data/schools.json";
import challenges from "../data/challenges.json";
import users from "../data/users.json";
import leaderboard from "./Leaderboard.vue"
import MainChartExample from './ChartComponent.vue'
import { timeAgo } from "@/util/datetime";
import { getRandomQuotableQuote } from "@/api/api";

// dashboard, profile

export default Vue.extend({
  name: "Home",
  // components: {
  //   MainChartExample
  // },
  data: function () {
    return {
      content: "",
      author: "",
      challenges: challenges,
      itemsPerPage: 4,
      headers: [
          {
            text: 'Your Progress',
            align: 'start',
            sortable: false,
            value: 'name',
          },
          { text: 'BBCS March 2023', align: 'end', value: 'number' },
        ],
      stats: [
        {
          name: 'Challenges Completed',
          number: challenges.filter(it => it.completed).length,
        },
        {
          name: 'Incomplete Challenges',
          number: challenges.filter(it => !it.completed).length,
        },
        {
          name: 'Mean Score',
          number: this.$store.state.user.score,
        },
        {
          name: 'Leaderboard position',
          number: users.sort((a, b) => {
            return a.score === b.score ? a.name.localeCompare(b.name) : (b.score ?? 0) - (a.score ?? 0);
          }).map((it, index) => ({
            rank: index == 0 ? "🥇" : index == 1 ? "🥈" : index == 2 ? "🥉" : index+1,
            name: it.name,
            username: it.username,
            score: it.score,
            pfp: it.profilePicture
          })).indexOf(this.$store.state.user)
        }
      ]
    }
  },
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  async mounted() {
    const quote = await getRandomQuotableQuote();
    this.content = quote.content;
    this.author = quote.author;
    console.log(this.user);
    // console.log(this.user);
    // console.log(this.content, this.author);
    // this.user.school = this.getCookie("school");
    // this.user.about = this.getCookie("about");
  }
  // async mounted() {
  //   const quote = await getRandomQuotableQuote();
  //   this.content = quote.content;
  //   this.author = quote.author;
  //   console.log(this.content, this.author);
  // }
});

</script>
