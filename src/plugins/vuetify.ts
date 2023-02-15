import Vue from "vue";
import Vuetify from "vuetify";

Vue.use(Vuetify);

const vuetify = new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#ff9900",
        secondary: "#c5c3b0",
        anchor: "#ffea8c",
      },
      dark: {
        primary: "#dd5500",
        secondary: "#110000",
        anchor: "#554444",
      }
    },
  },
})

export default vuetify;
