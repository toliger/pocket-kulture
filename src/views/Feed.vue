<template>
  <div id="app">
    <v-app id="inspire">
      <v-card max-width="400" class="mx-auto">
        <v-row dense>
          <v-col v-for="(item, i) in items" :key="i" cols="12">
            <v-card v-on:click="topic(item.id)" :color="item.color" dark>
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

export default {
  name: "Home",
  components: {},
  methods: {
    topic: function(topicId) {
      this.$router.push({ name: "Topic", params: { topicId } });
    }
  },
  data: () => ({
    items: [
      {
        color: "#1F7087",
        src:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/14-02-02-straszburg-RalfR-113.jpg/1181px-14-02-02-straszburg-RalfR-113.jpg",
        title: "Harry Potter à l'école des philosophes",
        artist: "Emma Wilson",
        id: "a6a5d7f2-2f45-11eb-adc1-0242ac120002"
      },
      {
        color: "#952175",
        src:
          "https://upload.wikimedia.org/wikipedia/commons/1/15/Jielbeaumadier_manifestation_pro-palestine_paris_2014.jpeg",
        title: "Le féminisme avec Aya Nakamura",
        artist: "Clara Larceaune",
        id: "a6a5d7f3-2f45-11eb-adc1-0242ac120002"
      },
      {
        color: "#d4b76a",
        src:
          "https://upload.wikimedia.org/wikipedia/commons/7/7d/Humans_on_Mars.jpg",
        title: "Peut-on vivre Seul sur Mars ?",
        artist: "Mathieu Damiens",
        id: "a6a5d7f3-2f45-11eb-adc1-0242ac120002"
      }
    ]
  })
};
</script>
