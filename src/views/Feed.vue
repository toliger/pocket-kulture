<template>
  <div id="app">
    <v-app id="inspire">
      <v-card max-width="400" class="mx-auto">
        <v-row dense>
          <v-col v-for="(item, i) in top" :key="i" cols="12">
            <v-card @click="topic(item.id)" :color="item.color" dark>
              <div class="d-flex flex-no-wrap justify-space-between">
                <div>
                  <v-card-title class="text-h6">{{ item.title }}</v-card-title>

                  <v-card-subtitle v-text="item.artist"></v-card-subtitle>
                </div>

                <v-avatar class="ma-3" size="125" tile>
                  <v-img :src="item.src"></v-img>
                </v-avatar>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-card>
    </v-app>
  </div>
</template>

<script>
// @ is an alias to /src
import { topics } from "../firebase";

export default {
  name: "Home",
  components: {},
  methods: {
    topic: function(topicId) {
      this.$router.push({ name: "Topic", params: { topicId } });
    }
  },
  mounted() {
    topics.get().then(data => {
      this.top = data.docs.map(doc => doc.data());
    });
  },
  data: () => ({
    top: [],
  })
};
</script>
