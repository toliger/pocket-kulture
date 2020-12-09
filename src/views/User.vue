<template>
  <v-container>
    <v-row>
      <v-col cols="12"> </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { users } from "@/firebase";

export default {
  name: "UserPage",
  data: () => ({
    user: {}
  }),
  async mounted() {
    this.user = await users.doc(this.$route.params.uid).get();
  }
};
</script>
