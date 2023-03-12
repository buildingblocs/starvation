import Vue from "vue";
import Vuetify from "vuetify";

Vue.use(Vuetify, {
  options: {
    customProperties: true
  }
});

const vuetify = new Vuetify({
  theme: {
    dark: true,
    themes: {
      light: {
        primary: "#ff9900",
        secondary: "#c5c3b0",
        anchor: "#ffea8c",
        gold: "#806400",
        silver: "#595959",
        bronze: "#7b501e",
      },
      dark: {
        primary: "#dd5500",
        secondary: "#110000",
        gold: "#ffde66",
        silver: "#d9d9d9",
        bronze: "#dca96f"
      }
    },
  },
});


export default vuetify;
