<template>
<v-flex>
  <v-container fluid>
  <v-card-title class="text--primary">Open Challenges</v-card-title>
    <v-layout wrap justify-space-around>
        <v-flex v-for="challenge in incomplete" :key="challenge.id" style="flex-grow: 0; padding-bottom: 40px;">
          <ChallengeCard :challenge="challenge"></ChallengeCard>
        </v-flex>
    </v-layout>
  <v-card-title class="text--primary">Past Challenges</v-card-title>
    <v-layout wrap justify-space-around>
        <v-flex v-for="challenge in completed" :key="challenge.id" style="flex-grow: 0; padding-bottom: 40px;">
          <ChallengeCard :challenge="challenge"></ChallengeCard>
        </v-flex>
    </v-layout>
</v-container>
</v-flex>
</template>

<script lang="ts">
import Vue from "vue";

import ChallengeCard from "@/components/ChallengeCard.vue";

import challenges from "../data/challenges.json";

// class Challenge {
//   id!: number
//   title!: string
//   description!: string
//   difficulty!: number
//   completed!: boolean
//   lastUpdated!: number
//   score!: number
// }

export default Vue.extend({
  name: "Challenges",
  components: {
    ChallengeCard
  },
  data() {
    return {
      challenges: challenges
    };
  },
  computed: {
    incomplete() {
      return challenges.filter(it => !it.completed);
    },
    completed() {
      return challenges.filter(it => it.completed);
    }
  }
});
</script>


