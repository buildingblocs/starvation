import Vue from "vue";
import hljs from "highlight.js";
import kotlin from "highlight.js/lib/languages/kotlin";

// import "../styles/code.css";
import "firacode/distr/fira_code.css";
import "highlight.js/styles/atom-one-dark.css";

hljs.registerLanguage("kotlin", kotlin);

Vue.use(hljs.vuePlugin);
