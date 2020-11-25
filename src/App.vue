<template>
  <v-app>
    <v-main>
      <router-view></router-view>
    </v-main>
    <v-bottom-navigation fixed hide-on-scroll color="primary">
      <v-btn
        v-for="(item, idx) in navLinks"
        :key="idx"
        :value="item.name"
        :to="{ name: item.name }"
      >
        <span>{{ item.title }}</span>

        <v-icon>{{ item.icon }}</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {},

  data: () => ({
    currentPage: "home",
    navLinks: [
      { title: "Accueil", icon: "mdi-home", name: "Home" },
      { title: "Mon Fil", icon: "mdi-menu", name: "Feed" },
      { title: "Suggestions", icon: "mdi-lightbulb", name: "About" },
      { title: "Débats", icon: "mdi-message-processing", name: "Debates" },
      { title: "Profil", icon: "mdi-account", name: "Profile" }
    ]
  })
};
</script>
