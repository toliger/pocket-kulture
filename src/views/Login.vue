<template>
  <div class="login">
    <h3>Sign In</h3>
    <button @click="socialLogin">Avec Google</button>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "login",
  methods: {
    socialLogin() {
      const provider = new firebase.auth.GoogleAuthProvider();

      firebase
        .auth()
        .signInWithPopup(provider)
        .then(() => {
          this.$router.replace("Home");
        })
        .catch(err => {
          console.log(err.message);
        });
    }
  }
};
</script>
