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
              <v-col cols="12" v-if="user.uid != $route.params.uid">
                <v-btn
                  color="primary"
                  dark
                  v-if="
                    targetUser.followers &&
                      targetUser.followers.indexOf(user.uid) === -1
                  "
                  v-on:click="follow"
                >
                  S'abonner
                </v-btn>
                <v-btn color="primary" dark v-else v-on:click="unfollow">
                  Se désabonner
                </v-btn>
              </v-col>
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
  methods: {
    follow() {
      if (this.targetUser.followers.indexOf(this.user.uid) === -1) {
        this.targetUser.followers.push(this.user.uid);
      }

      users
        .doc(this.$route.params.uid)
        .update({ followers: this.targetUser.followers })
        .then(() => {
          this.$store.dispatch("followUser", this.targetUser.id);
        });
    },
    unfollow() {
      console.log(this.targetUser.followers);
      const index = this.targetUser.followers.indexOf(this.user.uid);
      if (index > -1) {
        this.targetUser.followers.splice(index, 1);
      }
      console.log(this.targetUser.followers);

      users
        .doc(this.$route.params.uid)
        .update({ followers: this.targetUser.followers })
        .then(() => {
          this.$store.dispatch("unfollowUser", this.targetUser.id);
        });
    }
  },
  mounted() {
    users
      .doc(this.$route.params.uid)
      .get()
      .then(snapshot => {
        if (snapshot.exists) {
          this.targetUser = snapshot.data();
          this.targetUser.id = snapshot.id;
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
