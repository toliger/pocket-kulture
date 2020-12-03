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

        <!-- interests -->
        <v-row>
          <v-col cols="12" class="text-left">
            <div class="text-h5">Centres d'intérêt</div>
            <v-autocomplete
              v-model="placeholder.interests"
              :items="categories"
              chips
              deletable-chips
              multiple
            >
              <template v-slot:selection="data">
                <v-chip
                  v-bind="data.attrs"
                  :input-value="data.selected"
                  close
                  :color="data.item.color"
                  @click="data.select"
                  @click:close="remove(data.item)"
                >
                  {{ data.item.text }}
                </v-chip>
              </template>
            </v-autocomplete>
          </v-col>
        </v-row>

        <!-- menus  -->
        <v-row>
          <v-col cols="12">
            <v-list>
              <div
                v-for="({ title, icon, name }, idx) in profileLinks"
                :key="idx"
              >
                <v-divider></v-divider>
                <v-list-item link :to="name">
                  <v-list-item-icon>
                    <v-icon>{{ icon }}</v-icon>
                  </v-list-item-icon>

                  <v-list-item-content>
                    <v-list-item-title>{{ title }}</v-list-item-title>
                  </v-list-item-content>

                  <v-list-item-icon>
                    <v-icon>mdi-chevron-right</v-icon>
                  </v-list-item-icon>
                </v-list-item>
              </div>
              <v-divider></v-divider>
            </v-list>
          </v-col>
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
  methods: {
    remove(item) {
      const index = this.placeholder.interests.indexOf(item.value);
      if (index >= 0) this.placeholder.interests.splice(index, 1);
    }
  },
  data: () => ({
    placeholder: {
      lastname: "DUPONT",
      firstname: "Jean",
      age: "25",
      following: 18,
      followers: 734,
      interests: ["sciences", "nature", "food"]
    },
    profileLinks: [
      { title: "Historique", icon: "mdi-clock", name: "" },
      { title: "Enregistrements", icon: "mdi-content-save", name: "" },
      { title: "Compte Premium", icon: "mdi-currency-usd", name: "" },
      { title: "Nous contacter", icon: "mdi-phone", name: "" },
      { title: "FAQ", icon: "mdi-help", name: "" },
      { title: "A propos", icon: "mdi-information", name: "About" }
    ],
    categories: [
      // text and value fields mandatory for autocomplete
      { text: "Sciences", value: "sciences", color: "primary" },
      { text: "Politique", value: "politics", color: "primary" },
      { text: "Nature", value: "nature", color: "secondary" },
      { text: "Art", value: "art", color: "primary" },
      { text: "Histoire", value: "history", color: "primary" },
      { text: "Miam", value: "food", color: "secondary" }
    ]
  })
};
</script>
