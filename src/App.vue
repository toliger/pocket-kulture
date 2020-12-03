<template>
  <v-app>
    <v-main>
      <router-view></router-view>
    </v-main>
    <v-bottom-navigation
      app
      mandatory
      fixed
      hide-on-scroll
      color="primary"
      id="main-nav"
    >
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
export default {
  name: "App",

  components: {},
  methods: {
    goBack() {
      return this.$router.go(-1);
    }
  },
  data: () => ({
    navLinks: [
      { title: "Mon Fil", icon: "mdi-menu", name: "Feed" },
      { title: "Débats", icon: "mdi-message-processing", name: "Debates" },
      { title: "Suggestions", icon: "mdi-lightbulb", name: "Feed" },
      { title: "Profil", icon: "mdi-account", name: "Profile" }
    ]
  }),
  computed: {
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
</style>
