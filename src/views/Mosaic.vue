<template>
  <v-row>
    <v-col v-for="(item, i) in top" :key="i" cols="2">
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
            <v-row fill-height ma-0 align-center justify-center>
              <v-progress-circular
                indeterminate
                color="grey ligthen-5"
              ></v-progress-circular>
            </v-row>
          </template>
        </v-img>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { topics, auth } from "../firebase";

export default {
  name: "Mosaic",
  components: {},
  methods: {
    topic: function(topicId) {
      this.$router.push({ name: "Topic", params: { topicId } });
    }
  },
  mounted() {
    auth.onAuthStateChanged(user => {
      if (user) {
        if (user.interests)
          topics
            .where("tags", "array-contains-any", user.interests)
            .get()
            .then(data => {
              this.top = data.docs.map(doc => {
                let res = doc.data();
                res.id = doc.id;
                return res;
              });
            });
        else
          topics.get().then(data => {
            this.top = data.docs.map(doc => {
              let res = doc.data();
              res.id = doc.id;
              return res;
            });
          });
      }
    });
  },
  data: () => ({
    top: {}
  })
};
</script>
