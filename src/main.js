import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import firebase from 'firebase/app';

Vue.config.productionTip = false;

const firebaseConfig = {
  apiKey: "AIzaSyCkx9RJI1ZVzP2pZm9A1p0H_qUGV2f2lhQ",
  authDomain: "pocket-kulture.firebaseapp.com",
  databaseURL: "https://pocket-kulture.firebaseio.com",
  projectId: "pocket-kulture",
  storageBucket: "pocket-kulture.appspot.com",
  messagingSenderId: "782087725688",
  appId: "1:782087725688:web:ab0bc2582f99a16c65c38d"
};

firebase.initializeApp(firebaseConfig);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app');
