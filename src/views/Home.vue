<template>
  <div id="app">
    <v-app id="inspire">
      <v-card
        max-width="400"
        class="mx-auto"
      >
    
    
          <v-row dense>
    
            <v-col
              v-for="(item, i) in items"
              :key="i"
              cols="12"
            >
              <v-card
                v-on:click="topic(item.id)"
                :color="item.color"
                dark
              >
                <div class="d-flex flex-no-wrap justify-space-between">
                  <div>
                    <v-card-title
                      class="headline"
                      v-text="item.title"
                    ></v-card-title>
    
                    <v-card-subtitle v-text="item.artist"></v-card-subtitle>
    
                  </div>
    
                  <v-avatar
                    class="ma-3"
                    size="125"
                    tile
                  >
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
  components: {
  },
  methods: {
    topic: function (plop) {
      console.log(plop);
    }
  },
  data: () => ({
    items: [
      {
        color: '#1F7087',
        src: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
        title: 'Supermodel',
        artist: 'Foster the People',
        id: "a6a5d7f2-2f45-11eb-adc1-0242ac120002",
      },
      {
        color: '#952175',
        src: 'https://cdn.vuetifyjs.com/images/cards/halcyon.png',
        title: 'Halcyon Days',
        artist: 'Ellie Goulding',
        id: "a6a5d7f3-2f45-11eb-adc1-0242ac120002",
      },
    ],
  }),
};
</script>
