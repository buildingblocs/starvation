<template>
  <v-card class="mx-auto pa-4" width="400px" height="100%">
    <v-flex class="text-overline">
      <div class="mx-4 d-flex" color="text--secondary">Mission {{ challenge.id }}</div>
    </v-flex>
    <v-card-title class="text--primary" style="word-break: break-word;">
      {{ challenge.title }}
    </v-card-title>
    <v-card-subtitle>
      {{ challenge.description }}
    </v-card-subtitle>
    <v-spacer/>
    <v-card-actions>
      <v-btn color="primary" dark :href="'#/challenges/' + challenge.id">
        Open
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script lang="ts">
import Vue from "vue";

export default Vue.component("challenge-card", {
  props: ["challenge"]
});
</script>
