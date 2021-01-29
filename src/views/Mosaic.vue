<template>
  <v-container>
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
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import { topics } from "../firebase";

export default {
  name: "Mosaic",
  components: {},
  methods: {
    topic: function(topicId) {
      this.$router.push({ name: "Topic", params: { topicId } });
    }
  },
  computed: {
    ...mapGetters(["user", "userData"]),
    userInterests: {
      get() {
        if (this.userData) {
          return this.userData.interests;
        }
        return [];
      }
    }
  },
  mounted() {
    if (this.userInterests.length > 0)
      topics
        .where("tags", "array-contains-any", this.userInterests)
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
  },
  data: () => ({
    top: {}
  })
};
</script>
