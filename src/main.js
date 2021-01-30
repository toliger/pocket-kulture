import Vue from "vue";
import Gravatar from "vue-gravatar";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import { auth } from "./firebase";
import VueOffine from "vue-offline";

Vue.component("v-gravatar", Gravatar);
Vue.use(VueOffine);

Vue.config.productionTip = false;

let app;

auth.onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      vuetify,
      render: h => h(App)
    }).$mount("#app");
  }
});
