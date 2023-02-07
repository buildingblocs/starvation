<template>
  <v-container fluid>
    <v-card>
      <v-card-title>
        <div>
          Quotable Quotes
        </div>
        <v-spacer/>
      </v-card-title>
    </v-card>

    <v-list
      dense
      nav>
      <v-list-item v-for="quote in quotes" v-bind:key="quote">
        <v-card>
          <v-card-title class="pa-8" style="word-break: normal">
            {{ quote.content }}
            <v-spacer/>
          </v-card-title>
          <div class="text-right pa-8">
            ~ {{ quote.author }}
          </div>
        </v-card>
        <v-spacer />
      </v-list-item>
    </v-list>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { getAllQuotableQuotes } from "@/api/api";
import {Quote} from "@/types/quotes";


export default Vue.extend({
  name: "QuotableQuotes",
  data: function () {
    return {
      quotes: Array<Quote>()
    };
  },
  async mounted() {
    this.quotes = await getAllQuotableQuotes();
  }
});

</script>
