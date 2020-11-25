<template>
  <v-container>
    <!-- main -->
    <v-row align-content="center" justify="center" class="text-center">
      <v-col cols="12" md="6">
        <!-- top row -->
        <v-row align-content="center" justify="center">
          <v-col cols="6" md="6">
            <v-avatar class="profile" color="grey" size="164" tile>
              <v-img
                src="https://cdn.vuetifyjs.com/images/profiles/marcus.jpg"
              ></v-img>
            </v-avatar>
          </v-col>
          <v-col cols="6" md="6">
            <v-row class="text-left">
              <v-col cols="12">{{ placeholder.lastname }}</v-col>
              <v-col cols="12">{{ placeholder.firstname }}</v-col>
              <v-col cols="12">{{ placeholder.age }} ans</v-col>
            </v-row>
          </v-col>
        </v-row>

        <!-- counters -->
        <v-row justify="center">
          <v-col cols="6" sm="6"
            ><v-btn color="success" dark>
              {{ placeholder.following }} abonnements
            </v-btn></v-col
          >
          <v-col cols="6" sm="6"
            ><v-btn color="secondary" dark>
              {{ placeholder.followers }} abonnés
            </v-btn></v-col
          >
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import firebase from "firebase/app";
import "firebase/auth";

export default {
  name: "Profile",
  mounted: () => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // User is signed in.
        //var firstname = user.displayName;
        //var email = user.email;
        //var emailVerified = user.emailVerified;
        //var photoURL = user.photoURL;
        //var isAnonymous = user.isAnonymous;
        //var uid = user.uid;
        //var providerData = user.providerData;
        // ...
      } else {
        // User is signed out.
        // ...
      }
    });
  },
  data: () => ({
    placeholder: {
      lastname: "DUPONT",
      firstname: "Jean",
      age: "54",
      following: 18,
      followers: 734
    }
  })
};
</script>
