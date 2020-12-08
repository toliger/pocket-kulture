module.exports = {
  transpileDependencies: ["vuetify"],
  pwa: {
    workboxPluginMode: "InjectManifest",
    workboxOptions: {
      swSrc: "service-worker.js"
    },
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "white",
    themeColor: "#FFFFFF",
    manifestOptions: {
      name: "Pocket Kulture",
      shotName: "Pocket Kulture",
      icons: [
        {
          src: "./img/icons/pk/PK_120.png",
          sizes: "120x120",
          type: "image/png"
        },
        {
          src: "./img/icons/pk/PK_128.png",
          sizes: "128x128",
          type: "image/png"
        },
        {
          src: "./img/icons/pk/PK_180.png",
          sizes: "180x180",
          type: "image/png"
        },
        {
          src: "./img/icons/pk/PK_192.png",
          sizes: "192x192",
          type: "image/png"
        },
        {
          src: "./img/icons/pk/PK_512.png",
          sizes: "512x512",
          type: "image/png"
        }
      ]
    },
    iconPaths: {
      appleTouchIcon: "img/icons/pk/PK_180.png",
      favicon16: "./img/icons/pk/PK_16.png",
      favicon32: "./img/icons/pk/PK_32.png"
    }
  }
};
