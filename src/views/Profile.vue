<template>
  <v-container fluid>

  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import api from "@/api/github";
import {Repo} from "@/types/github";

export default Vue.extend({
  name: "Profile",
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
