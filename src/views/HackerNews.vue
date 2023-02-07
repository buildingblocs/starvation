<template>
  <v-container fluid>
    <v-card>
      <v-card-title>
        <div>
          Hacker News
        </div>
      </v-card-title>
        <v-spacer/>
    </v-card>

    <v-list
      dense
      nav>
      <v-list-item v-for="article in articles" v-bind:key="article.title">
        <v-card>
          <v-card-title class="pa-8" style="word-break: normal">
              {{ article.title }}
          </v-card-title>
          <div class="pa-8">
            <span v-html="article.getContent()" />
          </div>
        </v-card>
        <v-spacer />
      </v-list-item>
    </v-list>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { getAllTopStories } from "@/api/api";
import { Article } from "@/types/hackernews";


export default Vue.extend({
  name: "QuotableQuotes",
  data: function () {
    return {
      articles: Array<Article>()
    };
  },
  async mounted() {
    this.articles = await getAllTopStories();
  }
});

</script>
