<template>
  <div class="login">
    <h3>Sign In</h3>
    <button @click="socialLogin">Avec Google</button>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "login",
  methods: {
    ...mapActions(["socialLogin"])
  }
};
</script>
