<template>
  <v-container fluid>
    <v-card>
      <div class="pa-8">

        <v-row justify='center'>
          <v-col cols='auto' align-self="center">
            <v-text-field v-model="name" label="Username" style="width: auto" v-on:keyup.enter="search" />
          </v-col>
          <v-col cols='auto' align-self="center">
            <v-btn v-on:click=search style="display: block; margin: auto">SEARCH</v-btn>
          </v-col>
        </v-row>

        <v-data-table :items-per-page="15" :headers=headers :items=repos class="elevation-1"
                      :footer-props="{showFirstLastPage: true, firstIcon: 'mdi-arrow-collapse-left', lastIcon: 'mdi-arrow-collapse-right'}"
                      :loading=loadingRepos>
        </v-data-table>
      </div>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import api from "@/api/github";
import {Repo} from "@/types/github";

export default Vue.extend({
  name: "GitHub",
  data: function () {
    return {
      name: "",
      repos: Array<Repo>(),
      loadingRepos: false,
      headers: [{text: "Repo Name", value: "name"},
        {text: "Language", value: "language"},
        {text: "Description", value: "description", sortable: false},
        {text: "Stars", value: "stargazers_count"},
        {text: "Watchers", value: "watchers_count"}]
    };
  },
  methods: {
    async search() {
      this.repos = await api.main(this.name);
    }
  }
});

</script>
