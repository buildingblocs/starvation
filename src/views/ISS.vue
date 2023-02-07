<template>
  <v-container fluid>
    <v-card>
      <v-card-title>
        <div>
          International Space Station Data
        </div>
        <v-spacer/>
      </v-card-title>
      <div class="pa-8">
        <div>
          {{ main }} The following are the Astronauts currently aboard the ISS!
        </div>
      </div>
    </v-card>
        <v-spacer />
        <v-card v-for="astronaut in astronauts" v-bind:key="astronaut">
          <v-card-title>
            <div>
              {{ astronaut }}
            </div>
          </v-card-title>
        </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import api from "@/api/iss";

export default Vue.extend({
  name: "ISS",
  data: function () {
    return {
      name: "",
      main: "",
      astronauts: Array<string>()
    };
  },
  async mounted() {
    this.main = await api.main();
    this.astronauts = await api.getAstronauts();
  }
});

</script>
