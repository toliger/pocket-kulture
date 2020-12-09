<template>
  <v-container>
    <!-- main -->
    <v-row align-content="center" justify="center" class="text-center">
      <v-col cols="12" md="6">
        <!-- top row -->
        <v-row align-content="center" justify="center">
          <v-col cols="6" md="6">
            <v-avatar class="profile" color="grey" size="164" tile>
              <v-gravatar :email="user.email" />
            </v-avatar>
          </v-col>
          <v-col cols="6" md="6">
            <v-row class="text-left">
              <v-col cols="12">{{ user.displayName }}</v-col>
              <v-col cols="12">{{ placeholder.age }} ans</v-col>
            </v-row>
          </v-col>
        </v-row>

        <!-- counters -->
        <v-row justify="center">
          <v-col cols="6" sm="6"
            ><v-btn color="success" dark>
              {{ nbFollowing }} abonnements
            </v-btn></v-col
          >
          <v-col cols="6" sm="6"
            ><v-btn color="secondary" dark>
              {{ nbFollowers }} abonnés
            </v-btn></v-col
          >
        </v-row>

        <!-- interests -->
        <v-row>
          <v-col cols="12" class="text-left">
            <div class="text-h5">Centres d'intérêt</div>
            <v-select
              v-model="userInterests"
              :items="categories"
              chips
              deletable-chips
              multiple
            >
              <template v-slot:selection="data">
                <v-chip
                  v-bind="data.attrs"
                  :input-value="data.selected"
                  :color="data.item.color"
                  @click="data.select"
                >
                  {{ data.item.text }}
                </v-chip>
              </template>
            </v-select>
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
                <v-list-item link :to="{ name }">
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
        <button v-on:click="logout">Logout</button>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapGetters } from "vuex";
import { auth } from "../firebase";

export default {
  name: "Profile",
  mounted: () => {},
  methods: {
    logout() {
      auth.signOut().then(
        () => {
          this.$store.dispatch("logout");
          this.$router.push({ name: "Feed" });
        },
        error => {
          console.log(error);
        }
      );
    }
  },
  data: () => ({
    selectedInterests: [],
    placeholder: {
      lastname: "DUPONT",
      firstname: "Jean",
      age: "25",
      following: 18,
      followers: 734
    },
    profileLinks: [
      { title: "Historique", icon: "mdi-clock", name: "Profile" },
      { title: "Enregistrements", icon: "mdi-content-save", name: "Profile" },
      { title: "Compte Premium", icon: "mdi-currency-usd", name: "Profile" },
      { title: "Nous contacter", icon: "mdi-phone", name: "Profile" },
      { title: "FAQ", icon: "mdi-help", name: "Profile" },
      {
        title: "Notifications",
        icon: "mdi-cellphone-cog",
        name: "PushSettings"
      },
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
  }),
  computed: {
    ...mapGetters(["user", "userData"]),
    userInterests: {
      get() {
        if (this.userData) {
          return this.userData.interests;
        }
        return [];
      },
      set(value) {
        this.$store.dispatch("updateInterests", value);
      }
    },
    nbFollowers() {
      return this.userData && this.userData.followers
        ? this.userData.followers.length
        : 0;
    },
    nbFollowing() {
      return this.userData && this.userData.following
        ? this.userData.following.length
        : 0;
    }
  }
};
</script>
