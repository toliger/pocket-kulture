<template>
  <v-app>
    <v-app-bar app color="primary" class="text-center">
      <v-toolbar-title>Pocket Kulture</v-toolbar-title>
    </v-app-bar>
    <v-main>
      <router-view></router-view>
    </v-main>
    <v-bottom-navigation mandatory fixed hide-on-scroll color="primary">
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
      { title: "Mon Fil", icon: "mdi-menu", name: "Feed" },
      { title: "Suggestions", icon: "mdi-lightbulb", name: "About" },
      { title: "Débats", icon: "mdi-message-processing", name: "Debates" },
      { title: "Profil", icon: "mdi-account", name: "Profile" }
    ]
  })
};
</script>
