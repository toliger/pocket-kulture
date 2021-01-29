<template>
  <v-container>
    <v-row align-content="center" justify="center" class="text-center">
      <v-col cols="12" md="6">
        <!-- top row -->
        <v-row align-content="center" justify="center">
          <v-col cols="6" md="6">
            <v-avatar class="profile" color="grey" size="164" tile>
              <v-gravatar :email="targetUser.email" />
            </v-avatar>
          </v-col>
          <v-col cols="6" md="6">
            <v-row class="text-left">
              <v-col cols="12">{{ targetUser.displayName }}</v-col>
              <v-col cols="12">25 ans</v-col>
              <v-col cols="12" v-if="user.uid != $route.params.uid">
                <v-btn
                  color="primary"
                  dark
                  v-if="
                    targetUser.followers &&
                      targetUser.followers.indexOf(user.uid) === -1
                  "
                  v-on:click="follow"
                >
                  S'abonner
                </v-btn>
                <v-btn color="primary" dark v-else v-on:click="unfollow">
                  Se désabonner
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>

        <!-- counters -->
        <v-row justify="center">
          <v-col cols="6" sm="6"
            ><v-btn color="success" dark outlined>
              {{ nbFollowing }} abonnements
            </v-btn></v-col
          >
          <v-col cols="6" sm="6"
            ><v-btn color="secondary" dark outlined>
              {{ nbFollowers }} abonnés
            </v-btn></v-col
          >
        </v-row>

        <!-- topics -->
        <v-row justify="center">
          <v-col cols="12">
            <v-divider></v-divider>
            <h2 class="text-h5 overline mt-2 mb-2">Posts</h2>
          </v-col>
          <v-col cols="12">
            <v-list>
              <v-list-item
                v-for="(item, idx) of [...topics, ...debates]"
                :key="idx"
              >
                <v-list-item-icon>
                  <v-icon v-if="item.kind == 'debate'"
                    >mdi-message-reply-text-outline</v-icon
                  >
                  <v-icon v-if="item.kind == 'topic'"
                    >mdi-head-lightbulb-outline</v-icon
                  >
                </v-list-item-icon>
                <v-list-item-content class="text-left">
                  {{ item.title }}
                </v-list-item-content>
                <v-list-item-action>
                  <v-btn color="accent" small :to="getLink(item)">
                    Voir
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { users, forums, topics } from "@/firebase";
import { mapGetters } from "vuex";

export default {
  name: "UserPage",
  data: () => ({
    targetUser: {},
    topics: [],
    debates: []
  }),
  methods: {
    follow() {
      if (this.targetUser.followers.indexOf(this.user.uid) === -1) {
        this.targetUser.followers.push(this.user.uid);
      }

      users
        .doc(this.$route.params.uid)
        .update({ followers: this.targetUser.followers })
        .then(() => {
          this.$store.dispatch("followUser", this.targetUser.id);
        });
    },
    unfollow() {
      console.log(this.targetUser.followers);
      const index = this.targetUser.followers.indexOf(this.user.uid);
      if (index > -1) {
        this.targetUser.followers.splice(index, 1);
      }
      console.log(this.targetUser.followers);

      users
        .doc(this.$route.params.uid)
        .update({ followers: this.targetUser.followers })
        .then(() => {
          this.$store.dispatch("unfollowUser", this.targetUser.id);
        });
    },
    fetchPosts(user_id) {
      topics
        .where("author_id", "==", user_id)
        .get()
        .then(data => {
          data.docs.map(doc => {
            let id = doc.id;
            let data = doc.data();
            let kind = "topic";
            this.topics = [{ id, kind, ...data }, ...this.topics];
          });
        })
        .catch(err => {
          console.error(err);
        });

      forums
        .where("author", "==", user_id)
        .get()
        .then(data => {
          data.docs.map(doc => {
            let id = doc.id;
            let { title } = doc.data();
            let kind = "debate";
            this.debates = [{ id, kind, title }, ...this.debates];
          });
        })
        .catch(err => {
          console.error(err);
        });
    },
    getLink({ id, kind }) {
      switch (kind) {
        case "topic": {
          return { name: "Topic", params: { topicId: id } };
        }
        case "debate": {
          return { name: "Debate", params: { forumId: id } };
        }
        default: {
          return { name: "Feed" };
        }
      }
    }
  },
  mounted() {
    users
      .doc(this.$route.params.uid)
      .get()
      .then(snapshot => {
        if (snapshot.exists) {
          this.targetUser = snapshot.data();
          this.targetUser.id = snapshot.id;
          this.fetchPosts(this.targetUser.id);
        }
      });
  },
  computed: {
    ...mapGetters(["user"]),
    nbFollowers() {
      return this.targetUser && this.targetUser.followers
        ? this.targetUser.followers.length
        : 0;
    },
    nbFollowing() {
      return this.targetUser && this.targetUser.following
        ? this.targetUser.following.length
        : 0;
    }
  }
};
</script>
