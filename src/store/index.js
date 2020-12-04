import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase/app";
import router from "../router";
Vue.use(Vuex);

const initState = () => {
  return { user: null, error: null };
};

export default new Vuex.Store({
  state: initState(),
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    setError(state, payload) {
      state.error = payload;
    }
  },
  actions: {
    signUpAction({ commit }, payload) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then(response => {
          commit("setUser", response.user);
        })
        .catch(error => {
          commit("setError", error.message);
        });
    },
    socialLogin({ commit }) {
      const provider = new firebase.auth.GoogleAuthProvider();

      firebase
        .auth()
        .signInWithPopup(provider)
        .then(res => {
          commit("setUser", res.user);
          router.replace("Profile");
        })
        .catch(err => {
          console.log(err.message);
        });
    },
    signInAction({ commit }, payload) {
      return firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then(response => {
          commit("setUser", response.user);
        })
        .catch(error => {
          commit("setError", error.message);
        });
    }
  },
  modules: {},
  getters: {
    user(state) {
      return state.user;
    },
    isUserAuth(state) {
      return !!state.user;
    },
    error(state) {
      return state.error;
    }
  }
});
