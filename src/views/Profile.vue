<template>
  <v-container fluid>
    <v-card width="300px">
      <v-avatar size="200px" >
        <v-img
          :aspect-ratio="1"
          :width="250"
          :src="user.profilePicture"
          class="justify-center"
          cover
        ></v-img>
      </v-avatar>
      <v-card-title class="justify-center">Prannaya Gupta</v-card-title>
      <v-textarea clearable label="About Me" variant="underlined"></v-textarea>
      <v-combobox
        label="School"
        :items=schools
        :item-value=user.school
      ></v-combobox>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Profile",
  data: function () {
    return {
      user: {
        name: "Prannaya",
        about: "I am a high student from NUS High School and I love Maths and Science!",
        school: "NUS High School of Mathematics and Science",
        profilePicture: "data:image/jpeg;base64,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"
      },
      schools: [
        "JPJC",
        "DHS",
        "TMS",
        "NYJC",
        "ADSS",
        "ACSBR",
        "VJC",
        "CWSS",
        "CTSS",
        "MSHS",
        "BVSS",
        "NSF",
        "BTVSS",
        "RI",
        "NUSH",
        "TJC",
        "SAJC",
        "YIJC"
      ]
    };
  },
  methods: {
  }
});

</script>
