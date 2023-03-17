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
          <div class="justify-center" :style="{'margin-left': '50px', 'bottom': '100px', 'position':'absolute', 'font-size':'8pt'}">
            {{ homeHealth }}<br>
          <v-img :width="50"
                :src="sprites.homeBase">

          </v-img>
        </div>
          <div class="justify-center" :style="{'margin-left': '500px', 'bottom': '100px', 'position':'absolute', 'font-size':'8pt', 'align':'center'}">
            {{ oppHealth }}<br>
            <v-img :width="50"
                  :src="sprites.oppBase">

            </v-img>
          </div>
          <div v-for="troop in troops" :key="troop.id" class="justify-center" :style="{'margin-left': troop.marginLeft+'px', 'bottom': '100px', 'position':'absolute', 'font-size':'8pt', 'align':'center'}">
            {{ troop.health }} <br>
            <v-img :width="10"
                  :src="troop.imgSrc">

            </v-img>
          </div>
        <v-progress-circular
      :size="120"
      :width="12"
      color="purple"
      indeterminate
      style="margin-left: 220px; margin-top: 80px;"
      v-show="loading"
    ></v-progress-circular>
        </v-card><br>
        <v-btn v-if="animating" @click="setToEnd()">
          Fast Forward
        </v-btn>
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
        <v-dialog
          v-model="showWin"
          persistent
          :width="500"
        >
          <v-card>
            <v-card-title class="text-h4">
              {{ (winner == 'You' ? 'You Win :)' : (winner == 'Draw' ? 'You drew :|' : 'AI Wins :(')) }}
            </v-card-title>
            <v-card-text class="text-body-1">{{ (winner == 'You' ? 'Good Job!' : 'Oops, try again!') }}</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                variant="text"
                @click="showWin = false"
              >
                Close
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog
          v-model="showError"
          persistent
          :width="500"
        >
          <v-card>
            <v-card-title class="text-h4">
              An error occurred :(
            </v-card-title>
            <v-card-text class="text-body-1">{{ errorName }}</v-card-text>
            <v-card-text style="width: 100%; display: flex;">
              <code style="width: 100%; white-space: pre-wrap;">{{ errorDetails }}</code>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                variant="text"
                @click="showError = false"
              >
                Close
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
  </v-container>
</template>

<script>
import CodeEditorVue from "simple-code-editor";
import challenges from "../data/games.json";
import sprites from "../data/sprites.json";
import { getResults, updateResults, getCode } from "@/api/api";

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
      fps: 30,
      animating: false,
      troops: [],
      results: [],
      loading: false,
      showWin: false,
      showError: false,
      errorDetails: "xd\nxd",
      errorName: "xd",
      winner: "Right"
    };
  },
  async mounted() {
    console.log(challenges);
    console.log(this.$route.params.id);
    this.challenge = challenges[this.$route.params.id-1];
    console.log(this.challenge);
    this.id = this.$route.params.id;
    this.code = this.challenge.template;
    let fetched = await getCode(this.$store.state.user.id, this.id);
    console.log(fetched);
    if(fetched.length > 0) this.code = fetched;
  },

  methods: {
    setToEnd() {
      this.timeFrame = this.results.length - 2;
    },
    async run() {
      console.log(this.code);
      this.loading = true;
      let result = await getResults(this.challenge.prepend+ "\n" + this.code + "\n" + this.challenge.append, this.id, this.$store.state.user.id);
      console.log(result);
      const status = result.status;
      result = result.output;
      this.loading = false;
      if (!status) {
        this.errorName = result.error;
        this.errorDetails = result.details;
        this.showError = true;
        return;
      }
      this.results = result.details;
      this.winner = result.result === "left" ? "You" : (result.result === "right" ? "AI" : "Draw");
      console.log(this.results);
      clearInterval(this.animId);
      this.animating = true;
      this.animId = setInterval(this.update, 1000 / this.fps);
      this.troops = [];
      updateResults(this.$store.state.user.id, this.$route.params.id, this.code, this.winner === "You" ? 1 : 0);
    },

    save() {
      return;
    },

    clear() {
      this.troops = [];
      clearInterval(this.animId);
    },
    update() {
      if(this.timeFrame >= this.results.length || this.results[this.timeFrame]["1"].h < 0 || this.results[this.timeFrame]["-1"].h < 0) {
        clearInterval(this.animId);
        console.log(this.troops);
        this.animating = false;
        console.log("stopped");
        this.timeFrame = 0;
        this.showWin = true;
      } else {
        this.homeHealth = Math.floor(this.results[this.timeFrame]["1"].h);
        this.oppHealth = Math.floor(this.results[this.timeFrame]["-1"].h);
        const aliveTroops = Object.entries(this.results[this.timeFrame]);
        const toDelete = [];
        for(const troop of this.troops) {
          if (aliveTroops.filter(it => it[0] == troop.id).length === 0) {
            toDelete.push(troop);
            console.log("died");
          }
        }
        for(const troop of toDelete) {
          this.troops.splice(this.troops.indexOf(troop), 1);
        }
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
