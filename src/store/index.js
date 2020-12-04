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
    fetchUserData({ state, commit }) {
      const ref = users.doc(state.user.uid);
      ref.get().then(async snapshot => {
        if (snapshot.exists) {
          commit("setUserData", snapshot.data());
        } else {
          let defaultData = { interests: [] };
          commit("setUserData", defaultData);
          await ref.set(defaultData);
        }
      });
    },
    async updateInterests({ commit, getters }, payload) {
      const ref = users.doc(getters.uid);
      await ref.update({ interests: payload });
      commit("setUserData", { interests: payload, ...getters.userData });
    }
  },
  modules: {},
  getters: {
    user(state) {
      return state.user;
    },
    uid: state => {
      if (state.user) {
        return state.user.uid;
      }
      return null;
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
