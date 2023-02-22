<template>
  <v-card>
    <v-card-item>
      <v-card-title class="red justify-center ">Challenges</v-card-title>
    </v-card-item>

    <v-list-item v-for="challenge in uncompleted" :key="challenge.i" two-line>
      <v-sheet class="pa-4 mt-2" height="100" elevation="4" width="100%">
        <v-list-item-content>
          <v-list-item-title>
            {{ `Mission ${challenge.i}: ${challenge.task}` }}
          </v-list-item-title>
          <v-list-item-subtitle class="text-wrap">
            {{ challenge.description }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-sheet>
    </v-list-item>

    <v-card-item>
      <v-card-title class="green justify-center mt-16">Completed</v-card-title>
    </v-card-item>

    <v-list-item v-for="challenge in completed" :key="i" two-line>
      <v-sheet class="pa-4 mt-2" height="100" elevation="4" width="100%">
        <v-list-item-content>
          <v-list-item-title>
            {{ `Mission ${challenge.i}: ${challenge.task}` }}
          </v-list-item-title>
          <v-list-item-subtitle class="text-wrap">
            {{ challenge.description }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-sheet>
    </v-list-item>
  </v-card>
</template>

<script lang="js">
export default {
  data() {
    return {
      challenges: [
        {
          task: "Win the game!",
          description:
            "sdjkfjaskld;fjskjldfl;sdjdfl;sdjflksdjfklasdjflksdjflssdfsadjkfhjksaldhfjkhsdjfhsdjhfksdhfkjshdfjkhskdjfhskdhfkjshdfkshdfkjhsdkfhskfhskdjhfkjsdhfjksdhfkdjfkls kill the boss",
          difficulty: 3,
          completed: false,
          i: 0
        },
        {
          task: "Collect the item",
          description: "In Chapter 1, complete the quest: Prevent Starvation",
          difficulty: 3,
          completed: false,
          i: 1
        },
        {
          task: "Collect the item",
          description: "In Chapter 1, complete the quest: Prevent Starvation",
          difficulty: 3,
          completed: true,
          i: 2
        }
      ]
    };
  },

  computed: {
    uncompleted() {
      return this.challenges.filter(challenge => !challenge.completed);
    },

    completed() {
      return this.challenges.filter(challenge => challenge.completed);
    }
  }
};
</script>
