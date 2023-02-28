<template>
  <v-container fluid>
    <v-card class="pa-2 ma-2">
      <v-card-title class="text--primary justify-center"
        >Mission {{ selectedTask.id }}: {{ selectedTask.title }}</v-card-title
      >
      <v-card-subtitle class="justify-center">{{ selectedTask.description }}</v-card-subtitle>
    </v-card>

    <v-row no-gutter>
      <v-col>
        <v-sheet :height="300" color="green">
          Canvas
        </v-sheet>
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
            <v-btn v-bind="props" @click="run">
              Run
            </v-btn>
            <v-btn v-bind="props" @click="save">
              Save
            </v-btn>
          </template>
        </v-menu>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CodeEditorVue from "simple-code-editor";
import challenges from "../data/challenges.json";
import attempts from "../data/attempts.json";

export default {
  components: {
    CodeEditorVue
  },

  data() {
    return {
      editorMinWidth: 10,
      editorMinHeight: 10,
      id: +this.$route.params.id,
      challenge: challenges,
      attempts: attempts.find(attempt => attempt.id === this.id),
      error: `in line 6, error`
    };
  },

  computed: {
    selectedTask() {
      return challenges.find(challenge => challenge.id === this.id);
    },

    code() {
      return attempts.find(attempt => attempt.id === this.id).code;
    }
  },

  methods: {
    run() {
      return;
    },

    save() {
      return;
    }
  }
};
</script>
