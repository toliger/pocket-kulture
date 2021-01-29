n<template>
  <v-container>
    <v-card max-width="400" class="mx-auto">
      <v-row dense>
        <v-col v-for="(item, i) in top" :key="i" cols="12">
          <v-card @click="topic(item.id)" :color="item.color" dark>
            <div class="d-flex flex-no-wrap justify-space-between">
              <div>
                <v-card-title class="text-h6">{{ item.title }}</v-card-title>

                <v-card-subtitle v-text="item.artist"></v-card-subtitle>
                <v-card-actions>
                  <v-btn icon @click.stop="upvote">
                    <v-icon>mdi-arrow-up-bold-outline</v-icon>
                  </v-btn>
                  <v-btn icon @click.stop="downvote">
                    <v-icon>mdi-arrow-down-bold-outline</v-icon>
                  </v-btn>
                </v-card-actions>
              </div>

              <v-avatar class="ma-3" size="125" tile>
                <v-img :src="item.src"></v-img>
              </v-avatar>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
    <v-btn
      class="add-btn"
      color="accent"
      fab
      right
      absolute
      bottom
      :to="{ name: 'AddTopic' }"
      v-if="isUserAuth"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </v-container>
</template>
<script>
// @ is an alias to /src
import { topics } from "../firebase";
import { mapGetters } from "vuex";

export default {
  name: "Home",
  components: {},
  methods: {
    topic: function(topicId) {
      this.$router.push({ name: "Topic", params: { topicId } });
    },
    upvote() {
      console.log("upvote");
    },
    downvote() {
      console.log("downvote");
    }
  },
  mounted() {
    topics.get().then(data => {
      this.top = data.docs.map(doc => {
        let res = doc.data();
        res.id = doc.id;
        return res;
      });
    });
  },
  data: () => ({
    top: []
  }),
  computed: {
    ...mapGetters(["isUserAuth"])
  }
};
</script>
