<template>
  <v-container fluid id="create">
    <v-card class="pa-2 ma-2">
      <v-card-title class="text--primary justify-center"
        >Mission {{ challenge.id }}: {{ challenge.title }}</v-card-title
      >
      <v-card-subtitle class="text--primary justify-center">
        <span align="center">{{ challenge.description }}</span>
      </v-card-subtitle>
    </v-card>

    <v-row no-gutter>
      <v-col>
        <v-card :height="300" color="green" id="canvas">
          <div class="justify-center" :style="{'margin-left': '50px', 'bottom': '102px', 'position':'absolute', 'font-size':'8pt'}">
            {{ homeHealth }}<br>
          <v-img :width="50"
                :src="sprites.homeBase">

          </v-img>
        </div>
          <div class="justify-center" :style="{'margin-left': '500px', 'bottom': '102px', 'position':'absolute', 'font-size':'8pt', 'align':'center'}">
            {{ oppHealth }}<br>
            <v-img :width="50"
                  :src="sprites.oppBase">

            </v-img>
          </div>
          <div v-for="troop in troops" :key="troop.id" class="justify-center" :style="{'margin-left': troop.marginLeft+'px', 'margin-top': '160px', 'position':'absolute', 'font-size':'8pt', 'align':'center'}">
            <!-- {{ troop.health }}--><br>
            <v-img :width="10"
                  :src="troop.imgSrc">

            </v-img>
          </div>
        </v-card>
      </v-col>

      <v-col>
        <v-menu>
          <template v-slot:activator="{ props }">
            <CodeEditorVue
              :language_selector="false"
              :languages="[['python', 'Python']]"
              :wrap_code="true"
              v-model="code"
              width="auto"
            ></CodeEditorVue>
            <v-btn v-bind="props" @click="run()">
              Run
            </v-btn>
          </template>
        </v-menu>
      </v-col>
    </v-row>
    <v-row>
    <v-speed-dial
      v-model="fab"
      :top="false"
      :bottom="true"
      :right="true"
      :left="false"
      :direction="'top'"
      :open-on-hover="false"
      :transition="'scale-transition'"
    >
      <template v-slot:activator>
        <v-btn
          v-model="fab"
          color="blue darken-2"
          dark
          fab
        >
          <v-icon v-if="fab">
            mdi-close
          </v-icon>
          <v-icon v-else>
            mdi-cogs
          </v-icon>
        </v-btn>
      </template>
      <v-btn
        fab
        dark
        small
        color="green"
        @click="run()"
      >
        <v-icon>mdi-play-outline</v-icon>
      </v-btn>
      <v-btn
        fab
        dark
        small
        color="red"
      >
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </v-speed-dial>
    </v-row>
  </v-container>
</template>

<script>
import CodeEditorVue from "simple-code-editor";
import challenges from "../data/games.json";
import sprites from "../data/sprites.json";
import { getResults, updateResults } from "@/api/api";

export default {
  components: {
    CodeEditorVue
  },

  data() {
    return {
      editorMinWidth: 10,
      editorMinHeight: 10,
      challenge: {id: 0, title: "", description: "", template: ""},
      id: 0,
      fab: false,
      code: "",
      sprites: sprites,
      homeHealth: 250,
      oppHealth: 250,
      animId: 0,
      timeFrame: 0,
      troops: [],
      results: []
    };
  },
  mounted() {
    console.log(challenges);
    console.log(this.$route.params.id);
    this.challenge = challenges[this.$route.params.id-1];
    console.log(this.challenge);
    this.id = this.$route.params.id;
    this.code = this.challenge.template;
  },

  methods: {
    async run() {
      console.log(this.code);
      let result = await getResults(this.challenge.prepend+ "\n" + this.code + "\n" + this.challenge.append, this.id, this.$store.state.user.id);
      this.results = result.details;
      console.log(this.results);
      clearInterval(this.animId);
      this.animId = setInterval(this.update, 10);
      this.troops = [];
      //updateResults(this.$store.state.user.id, this.$route.params.id, this.code);
    },

    save() {
      return;
    },

    clear() {
      this.troops = [];
      clearInterval(this.animId);
    },
    update() {
      if(this.timeFrame == this.results.length || this.results[this.timeFrame]["1"].h < 0 || this.results[this.timeFrame]["-1"].h < 0) {
        clearInterval(this.animId);
        console.log("stopped");
        this.timeFrame = 0;

      } else {
        this.homeHealth = this.results[this.timeFrame]["1"].h;
        this.oppHealth = this.results[this.timeFrame]["-1"].h;
        for(const [troopId, troop] of Object.entries(this.results[this.timeFrame])) {
          if((troopId == "-1") || (troopId == "1")) continue;

          var search = this.troops.filter(it => it.id == troopId);

          if(search.length > 0) {
            // already exists

            let itemIndex = this.troops.indexOf(search[0]);
            if(troop.h >= 0) {
              this.troops[itemIndex].h = troop.h;
              this.troops[itemIndex].marginLeft = (troop.p / 1000) * 450 + 50;
            } else {
              this.troops[itemIndex].h = troop.h;
              this.troops = this.troops.splice(itemIndex, 1);
              console.log("troop died!");
            }
          } else {
            if(troop.h < 0) continue;
            this.troops.push({
              id: troopId,
              health: troop.h,
              marginLeft: (troop.p / 1000) * 450 + 50,
              imgSrc: troopId.includes("-") ? sprites.oppTroop : sprites.homeTroop
            });
          }
        }
        this.timeFrame++;
      }
    }
  }
};
</script>
<style>
  /* This is for documentation purposes and will not be needed in your application */
  #create .v-speed-dial {
    position: absolute;
  }

  #create .v-btn--floating {
    position: relative;
  }
</style>
