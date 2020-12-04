<template>
  <v-row>
    <v-col v-for="(item, i) in items" :key="i" cols="2">
      <v-card class="d-flex">
        <v-img 
          :src="item.src" 
          aspect-ratio="1" 
          class="grey lighten-2" 
          @click="topic(item.id)"
          max-height="300"
          max-width="500"
        >
          <template v-slot:placeholder>
            <v-row 
              fill-height 
              ma-0 
              align-center
              justify-center
            >
              <v-progress-circular indeterminate color="grey ligthen-5"></v-progress-circular>
            </v-row>
          </template>
        </v-img>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>

export default {
    name: "Mosaic",
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