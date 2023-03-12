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
    proxy: "http://34.142.168.126:3000/",
    host: "localhost"
    }
};
