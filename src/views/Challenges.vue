<template>
  <v-flex>
    <v-container fluid>
      <v-card-title class="text--primary">Open Challenges</v-card-title>
      <v-layout wrap justify-space-around>
        <v-flex
          v-for="challenge in challenges"
          :key="challenge.id"
          style="flex-grow: 0; padding-bottom: 20px;"
        >
          <ChallengeCard :challenge="challenge"></ChallengeCard>
        </v-flex>
      </v-layout>
    </v-container>
  </v-flex>
</template>

<script lang="ts">
import Vue from "vue";

import ChallengeCard from "@/components/ChallengeCard.vue";
import games from "../data/games.json";

export default Vue.extend({
  name: "Challenges",
  components: {
    ChallengeCard
  },
  data() {
    return {
      challenges: games
    };
  }
});
</script>
