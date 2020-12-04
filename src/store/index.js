import Vue from "vue";
import Vuex from "vuex";
import { users, auth } from "../firebase";
import { firebase } from "@firebase/app";
import router from "../router";
Vue.use(Vuex);

const initState = () => {
  return { user: null, userData: null, error: null };
};

export default new Vuex.Store({
  state: initState(),
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
    setUserData(state, payload) {
      state.userData = payload;
    }
  },
  actions: {
    signUpAction({ commit }, payload) {
      auth
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then(response => {
          commit("setUser", response.user);
        })
        .catch(error => {
          commit("setError", error.message);
        });
    },
    socialLogin({ dispatch, commit }) {
      const provider = new firebase.auth.GoogleAuthProvider();

      auth
        .signInWithPopup(provider)
        .then(res => {
          commit("setUser", res.user);
          dispatch("fetchUserData");
          router.replace("Profile");
        })
        .catch(err => {
          console.log(err.message);
        });
    },
    signInAction({ dispatch, commit }, payload) {
      return auth
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then(response => {
          commit("setUser", response.user);
          dispatch("fetchUserData");
        })
        .catch(error => {
          commit("setError", error.message);
        });
    },
    async fetchUserData({ state, commit }) {
      const query = await users.where("uid", "==", state.user.uid).get();
      if (!query.empty) {
        const snapshot = query.docs[0];
        const data = snapshot.data();
        commit("setUserData", data);
      }
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
    },
    userData: state => state.userData,
    userInterests: state => state.userData.interests
  }
});
