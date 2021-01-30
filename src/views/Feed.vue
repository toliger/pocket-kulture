n<template>
  <v-container>
    <v-row dense>
      <v-col cols="12">
        <v-autocomplete
          v-model="values"
          :items="filters"
          outlined
          dense
          chips
          small-chips
          label="Filtres"
          multiple
        ></v-autocomplete>
      </v-col>
      <v-col v-for="(item, i) in top" :key="i" cols="12">
        <v-card
          v-if="check_filter(item.id)"
          @click="topic(item.id)"
          :color="item.color"
          dark
        >
          <div class="d-flex flex-no-wrap justify-space-between">
            <div>
              <v-card-title class="text-h6">{{ item.title }}</v-card-title>

              <v-card-subtitle v-text="item.artist"></v-card-subtitle>
              <v-card-actions>
                <v-btn
                  icon
                  @click.stop="upvote(item.id)"
                  v-bind:class="{ no_clickable: !isUserAuth }"
                >
                  <v-icon v-if="hasVote(item.vote.up)"
                    >mdi-arrow-up-bold</v-icon
                  >
                  <v-icon v-else>mdi-arrow-up-bold-outline</v-icon>
                </v-btn>
                <span>{{ item.vote.up.length }}</span>
                <v-btn
                  icon
                  @click.stop="downvote(item.id)"
                  v-bind:class="{ no_clickable: !isUserAuth }"
                >
                  <v-icon v-if="hasVote(item.vote.down)"
                    >mdi-arrow-down-bold</v-icon
                  >
                  <v-icon v-else>mdi-arrow-down-bold-outline</v-icon>
                </v-btn>
                <span>{{ item.vote.down.length }}</span>
              </v-card-actions>
            </div>

            <v-avatar class="ma-3" size="125" tile>
              <v-img :src="item.src"></v-img>
            </v-avatar>
          </div>
        </v-card>
      </v-col>
    </v-row>
    <v-btn
      class="add-btn"
      color="accent"
      fab
      right
      fixed
      bottom
      :to="{ name: 'AddTopic' }"
      v-if="isUserAuth && !offline"
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
    upvote(id) {
      if (this.isUserAuth) {
        topics
          .doc(id)
          .get()
          .then(data => {
            data = data.data();
            let curpos = data.vote.up.indexOf(this.user.uid);
            if (curpos === -1) {
              let pos = data.vote.down.indexOf(this.user.uid);
              if (pos !== -1) {
                data.vote.down.splice(pos, 1);
              }
              data.vote.up.push(this.user.uid);
              topics
                .doc(id)
                .update({ vote: data.vote })
                .then(() => this.top_up());
            } else {
              data.vote.up.splice(curpos, 1);
              topics
                .doc(id)
                .update({ vote: data.vote })
                .then(() => this.top_up());
            }
          });
      }
    },
    downvote(id) {
      if (this.isUserAuth) {
        topics
          .doc(id)
          .get()
          .then(data => {
            data = data.data();
            let curpos = data.vote.down.indexOf(this.user.uid);
            if (curpos === -1) {
              let pos = data.vote.up.indexOf(this.user.uid);
              if (pos !== -1) {
                data.vote.up.splice(pos, 1);
              }
              data.vote.down.push(this.user.uid);
              topics
                .doc(id)
                .update({ vote: data.vote })
                .then(() => this.top_up());
            } else {
              data.vote.down.splice(curpos, 1);
              topics
                .doc(id)
                .update({ vote: data.vote })
                .then(() => this.top_up());
            }
          });
      }
    },
    top_up() {
      topics.get().then(data => {
        this.top = data.docs.map(doc => {
          let res = doc.data();
          res.id = doc.id;
          return res;
        });
        this.top.forEach(top => {
          top.tags.forEach(tag => {
            if (this.tag_f.indexOf(tag) === -1) {
              this.tag_f.push(tag);
            }
          });
          if (this.artist_f.indexOf(top.artist) === -1) {
            this.artist_f.push(top.artist);
          }
          if (this.title_f.indexOf(top.title) === -1) {
            this.title_f.push(top.title);
          }
        });
      });
    },
    check_filter(top_id) {
      if (this.values.length == 0) {
        return true;
      }
      let top_ind = -1;
      this.top.forEach((ltop, i) => {
        if (ltop.id == top_id) {
          top_ind = i;
          return;
        }
      });
      let res = false;
      this.values.forEach(tag => {
        if (this.top[top_ind].title === tag || this.top[top_ind].artist === tag) {
          res = true;
          return;
        }
        this.top[top_ind].tags.forEach(t => {
          if (t === tag) {
            res = true;
            return;
          }
        });
      });
      return res;
    },
    hasVote(votes) {
      if (!this.isUserAuth || !this.user) {
        return false;
      }
      return votes.includes(this.user.uid);
    }
  },
  mounted() {
    this.top_up();
  },
  data: () => ({
    top: [],
    tag_f: [],
    artist_f: [],
    title_f: [],
    values: []
  }),
  computed: {
    ...mapGetters(["user", "isUserAuth", "offline"]),
    filters() {
      return [...this.tag_f, ...this.artist_f, ...this.title_f];
    }
  }
};
</script>
<style>
.no_clickable {
  cursor: auto;
}
</style>
