<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h2 class="text-h4 overline mb-2 text-center">{{ title }}</h2>
        <v-divider></v-divider>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-list>
          <v-list-item
            v-for="(user, idx) of users"
            :key="idx"
            link
            :to="{ name: 'UserProfile', params: { uid: user.id } }"
          >
            <v-list-item-icon>
              <v-avatar class="profile" color="grey" size="56">
                <v-gravatar :email="user.email" />
              </v-avatar>
            </v-list-item-icon>
            <v-list-item-title>{{ user.displayName }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import { users } from "../firebase";
import { firebase } from "@firebase/app";

export default {
  name: "UserList",
  data: () => ({
    users: []
  }),
  mounted() {
    switch (this.$route.name) {
      case "Followings": {
        users
          .where(
            firebase.firestore.FieldPath.documentId(),
            "in",
            this.userData.following
          )
          .get()
          .then(data => {
            data.docs.map(doc => {
              let u = doc.data();
              let id = doc.id;
              this.users = [{ id, ...u }, ...this.users];
            });
          });
        break;
      }
      case "Followers": {
        users
          .where(
            firebase.firestore.FieldPath.documentId(),
            "in",
            this.userData.followers
          )
          .get()
          .then(data => {
            data.docs.map(doc => {
              let u = doc.data();
              let id = doc.id;
              this.users = [{ id, ...u }, ...this.users];
            });
          });
        break;
      }
      default: {
        break;
      }
    }
  },
  methods: {},
  computed: {
    ...mapGetters(["userData"]),
    title() {
      let res = "";
      switch (this.$route.name) {
        case "Followers": {
          res = "Abonnés";
          break;
        }
        case "Followings": {
          res = "Abonnements";
          break;
        }
        default:
          break;
      }
      return res;
    }
  }
};
</script>
