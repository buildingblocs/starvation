import ScrollReveal from "scrollreveal";
import _Vue from "vue";
const sr = ScrollReveal();

function generateOptions(defaultOptions, bindingValue, bindingModifiers) {
  const options = Object.assign({}, defaultOptions, bindingValue);

  if (bindingModifiers) {
    if (bindingModifiers.reset) {
      options.reset = true;
    }

    if (bindingModifiers.nomobile) {
      options.mobile = false;
    }

    if (bindingModifiers.nodesktop) {
      options.desktop = false;
    }
  }

  return options;
}


const VueScrollReveal = {
  install(Vue, defaultOptions) {
    Vue.directive("scroll-reveal", {
      inserted: (el, binding) => {
        const options = generateOptions(defaultOptions, binding.value, binding.modifiers);

        if (typeof options.class === "string") {
          el.classList.add(options.class);
          delete options.class;
        }

        sr.reveal(el, options);
      },
      update: (el, binding) => {
        if (binding.value != binding.oldValue) {
          const options = generateOptions(defaultOptions, binding.value, binding.modifiers);

          sr.reveal(el, options);
        }
      },
    });
  },
};

_Vue.use(VueScrollReveal);

export default sr;
