<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12">
        <!-- Start Wrapper -->

        <!-- Debate Topic -->
        <v-row>
          <v-col cols="12">
            <v-card class="mx-auto mb-10">
              <v-list-item three-line>
                <v-list-item-avatar tile size="80" color="grey">
                  <v-gravatar :email="author.email" />
                </v-list-item-avatar>
                <v-list-item-content>
                  <router-link
                    class="overline mb-4 user-link"
                    :to="{
                      name: 'UserProfile',
                      params: { uid: author.id ? author.id : 'oui' }
                    }"
                  >
                    {{ author.displayName }}
                  </router-link>
                  <v-list-item-title class="headline mb-1">{{
                    forum.title
                  }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-card-text>
                {{ forum.content }}
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <!-- Answers -->
        <v-row>
          <v-col cols="12">
            <v-card
              class="mx-auto ml-10 mt-5"
              :key="idx"
              v-for="(answer, idx) in forum.answers"
            >
              <v-list-item three-line>
                <v-list-item-avatar tile size="60" color="grey">
                  <v-gravatar :email="answer.author.email" />
                </v-list-item-avatar>
                <v-list-item-content>
                  <router-link
                    class="overline mb-4 user-link"
                    :to="{
                      name: 'UserProfile',
                      params: {
                        uid: answer.author.id ? answer.author.id : 'oui'
                      }
                    }"
                  >
                    {{ answer.author.displayName }}
                  </router-link>
                </v-list-item-content>
              </v-list-item>
              <v-row class="pl-6">
                <v-col cols="auto">
                  <v-card-text>
                    {{ answer.content }}
                  </v-card-text>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>

        <div v-if="isUserAuth">
          <v-text-field
            label="Votre réponse"
            v-model="typedContent"
            required
          ></v-text-field>
          <v-btn v-on:click="response" text style="color:black;"
            >Répondre</v-btn
          >
        </div>

        <!-- End Wrapper  -->
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapGetters } from "vuex";
import { forums, users } from "../firebase";

export default {
  name: "DebatePage",
  data: () => ({
    forum: {},
    typedContent: "",
    author: { displayName: "Anonymous", email: "example@example.com" }
  }),
  methods: {
    response() {
      let req = [];

      this.forum.answers.map(data => {
        req.push({ author: data.author.id, content: data.content });
      });

      req.push({ author: this.user.uid, content: this.typedContent });

      forums
        .doc(this.$route.params.forumId)
        .update({ answers: req })
        .then(() => {
          req.map(data => {
            users
              .doc(data.author)
              .get()
              .then(a => {
                data.author = a.data();
                data.author.id = a.id;
              });
          });
          this.forum.answers = req;
          this.typedContent = "";
        });
    }
  },
  mounted() {
    forums
      .doc(this.$route.params.forumId)
      .get()
      .then(data => {
        this.forum = data.data();
        this.forum.id = data.id;

        users
          .doc(this.forum.author)
          .get()
          .then(data => {
            this.author = data.data();
            this.author.id = data.id;
          });

        this.forum.answers.map(data => {
          users
            .doc(data.author)
            .get()
            .then(a => {
              data.author = a.data();
              data.author.id = a.id;
            });
        });
      });
  },
  computed: {
    ...mapGetters(["user", "isUserAuth"])
  }
};
</script>
<style lang="scss" scoped>
.user-link {
  text-decoration: none;
  color: blue;
}
</style>
