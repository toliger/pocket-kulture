<template>
  <v-app>
    <v-card>
      <v-card-title>
        <h1>Sign In</h1>
      </v-card-title>
      <v-card-actions>
        <v-btn color="info" @click="socialLogin">Login with Google</v-btn>
      </v-card-actions>
    </v-card>
  </v-app>
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
