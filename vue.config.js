module.exports = {
  lintOnSave: false,
  transpileDependencies: [
    "vuetify",
    "vue-scroll-reveal"
  ],
  chainWebpack: (config) => {
    config.module
      .rule("ts")
      .use("ts-loader")
      .loader("ts-loader");
  },
  devServer: {
    proxy: "http://starvation-api.buildingblocs.sg/"
  }
};
