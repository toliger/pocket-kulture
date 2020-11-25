<template>
  <v-app>
    <v-main>
      <router-view></router-view>
    </v-main>
    <v-bottom-navigation mandatory fixed hide-on-scroll color="primary">
      <v-btn
        v-for="(item, idx) in navLinks"
        :key="idx"
        :to="{ name: item.name }"
        exact
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
    currentPage: "Feed",
    navLinks: [
      { title: "Mon Fil", icon: "mdi-menu", name: "Feed" },
      { title: "Débats", icon: "mdi-message-processing", name: "Debates" },
      { title: "Suggestions", icon: "mdi-lightbulb", name: "About" },
      { title: "Profil", icon: "mdi-account", name: "Profile" }
    ]
  })
};
</script>
