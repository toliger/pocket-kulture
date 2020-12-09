<template>
  <v-container>
    <v-row align-content="center" justify="center" class="text-center">
      <v-col cols="12" md="6">
        <!-- top row -->
        <v-row align-content="center" justify="center">
          <v-col cols="6" md="6">
            <v-avatar class="profile" color="grey" size="164" tile>
              <v-gravatar :email="targetUser.email" />
            </v-avatar>
          </v-col>
          <v-col cols="6" md="6">
            <v-row class="text-left">
              <v-col cols="12">{{ targetUser.displayName }}</v-col>
              <v-col cols="12">25 ans</v-col>
              <v-col cols="12"
                ><v-btn
                  color="primary"
                  dark
                  v-if="user.uid != $route.params.uid"
                >
                  S'abonner
                </v-btn></v-col
              >
            </v-row>
          </v-col>
        </v-row>

        <!-- counters -->
        <v-row justify="center">
          <v-col cols="6" sm="6"
            ><v-btn color="success" dark outlined>
              {{ nbFollowing }} abonnements
            </v-btn></v-col
          >
          <v-col cols="6" sm="6"
            ><v-btn color="secondary" dark outlined>
              {{ nbFollowers }} abonnés
            </v-btn></v-col
          >
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { users } from "@/firebase";
import { mapGetters } from "vuex";

export default {
  name: "UserPage",
  data: () => ({
    targetUser: {}
  }),
  mounted() {
    users
      .doc(this.$route.params.uid)
      .get()
      .then(snapshot => {
        if (snapshot.exists) {
          this.targetUser = snapshot.data();
        }
      });
  },
  computed: {
    ...mapGetters(["user"]),
    nbFollowers() {
      return this.targetUser && this.targetUser.followers
        ? this.targetUser.followers.length
        : 0;
    },
    nbFollowing() {
      return this.targetUser && this.targetUser.following
        ? this.targetUser.following.length
        : 0;
    }
  }
};
</script>
