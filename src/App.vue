<template>
  <v-app>
    <v-main>
      <v-alert type="error" v-if="offline">
        Vous êtes actuellement hors-ligne.
      </v-alert>
      <router-view></router-view>
    </v-main>
    <v-bottom-navigation app mandatory fixed color="primary" id="main-nav">
      <v-btn @click="goBack" v-if="!isMainLink">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-btn
        v-for="(item, idx) in navLinks"
        :key="idx"
        :to="{ name: item.name }"
        exact
      >
        <!-- <span>{{ item.title }}</span> -->

        <v-icon>{{ item.icon }}</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "App",
  created() {
    this.$store.dispatch("initUser");
  },
  methods: {
    goBack() {
      return this.$router.go(-1);
    }
  },
  mounted() {
    this.$on("online", () => {
      this.$store.dispatch("updateNetwork", true);
    });
    this.$on("offline", () => {
      this.$store.dispatch("updateNetwork", false);
    });
  },
  data: () => ({
    navLinks: [
      { title: "Mon Fil", icon: "mdi-menu", name: "Feed" },
      { title: "Débats", icon: "mdi-message-processing", name: "Debates" },
      { title: "Suggestions", icon: "mdi-lightbulb", name: "Mosaic" },
      { title: "Profil", icon: "mdi-account", name: "Profile" }
    ]
  }),
  computed: {
    ...mapGetters(["offline"]),
    isMainLink: function() {
      for (let e of this.navLinks) {
        if (this.$route.name == e.name) {
          return true;
        }
      }
      return false;
    }
  }
};
</script>
<style lang="scss">
.v-item-group.v-bottom-navigation .v-btn.v-size--default {
  height: inherit;
}
.v-card__text,
.v-card__title {
  word-break: break-word !important;
}
.add-btn {
  bottom: 10% !important;
}
</style>
