<template>
  <v-flex>
  <v-container fluid>
    <v-card>
      <v-card-title class="pa-8" style="word-break: normal;">
        {{ content }}
      </v-card-title>
      <div class="text-right pa-8">
        ~ {{ author }}
      </div>
      <v-spacer />
    </v-card>
  </v-container>
  </v-flex>
</template>

<script lang="ts">
import Vue from "vue";
import {getRandomQuotableQuote} from "@/api/api";

export default Vue.extend({
  name: "Home",
  data: function () {
    return {
      content: "",
      author: ""
    };
  },
  async mounted() {
    const quote = await getRandomQuotableQuote();
    this.content = quote.content;
    this.author = quote.author;
    console.log(this.content, this.author);
  }
});

</script>
