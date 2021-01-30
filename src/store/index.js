import Vue from "vue";
import Vuex from "vuex";
import { users, auth } from "../firebase";
import { firebase } from "@firebase/app";
import router from "../router";
// import VuexPersistence from "vuex-persist";
// import { forage } from "../localStore";

Vue.use(Vuex);

// const vuexLocal = new VuexPersistence({
//   storage: forage,
//   asyncStorage: true
// });

const initState = () => {
  return { user: null, userData: null, error: null, online: true };
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
    },
    setInterests(state, payload) {
      if (!state.userData) {
        return;
      }
      state.userData.interests = payload;
    },
    setNetwork(state, mode) {
      state.online = mode;
    }
  },
  actions: {
    updateNetwork({ commit }, payload) {
      commit("setNetwork", !!payload);
    },
    initUser({ commit, dispatch }) {
      firebase.getCurrentUser().then(u => {
        if (u) {
          commit("setUser", u);
          dispatch("fetchUserData");
        }
      });
    },
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
    logout({ commit }) {
      commit("setUser", null);
      commit("setUserData", null);
    },
    socialLogin({ dispatch, commit }) {
      const provider = new firebase.auth.GoogleAuthProvider();

      auth
        .signInWithPopup(provider)
        .then(res => {
          commit("setUser", res.user);
          dispatch("fetchUserData");
          router.push("Profile");
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
          let { displayName, email } = state.user;
          let defaultData = {
            displayName,
            email,
            interests: [],
            push: null,
            notify_on_mod: false,
            notify_on_add: false,
            followers: [],
            following: []
          };
          commit("setUserData", defaultData);
          await ref.set(defaultData);
        }
      });
    },
    async updateInterests({ commit, getters }, payload) {
      const ref = users.doc(getters.uid);
      await ref.update({ interests: payload });
      commit("setInterests", payload);
    },
    async updateNotify({ commit, getters }, payload) {
      const ref = users.doc(getters.uid);
      let currentData = getters.userData;
      switch (payload) {
        case "add": {
          await ref.update({ notify_on_add: !currentData.notify_on_add });
          currentData.notify_on_add = !currentData.notify_on_add;
          break;
        }
        case "mod": {
          await ref.update({ notify_on_mod: !currentData.notify_on_mod });
          currentData.notify_on_mod = !currentData.notify_on_mod;
          break;
        }
        default:
          break;
      }
      commit("setUserData", currentData);
    },
    async followUser({ dispatch, getters }, payload) {
      const ref = users.doc(getters.uid);
      await ref.update({
        following: [...new Set([...getters.userData.following, payload])]
      });
      dispatch("fetchUserData");
    },
    async unfollowUser({ dispatch, getters }, payload) {
      const ref = users.doc(getters.uid);
      const index = getters.userData.following.indexOf(payload);
      if (index > -1) {
        let newArr = [...getters.userData.following];
        newArr.splice(index, 1);
        await ref.update({ following: newArr });
        dispatch("fetchUserData");
      }
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
    userInterests: state => state.userData.interests,
    offline: state => !state.online
  }
  // plugins: [vuexLocal.plugin]
});
