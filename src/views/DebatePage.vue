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
                <v-list-item-avatar
                  tile
                  size="80"
                  color="grey"
                >
                  <v-gravatar :email="author.email" />
                </v-list-item-avatar>
                <v-list-item-content>
                  <div class="overline mb-4">
                    {{ author.displayName }}
                  </div>
                  <v-list-item-title class="headline mb-1">{{
                    forum.title
                  }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-card-text>
                {{ forum.content }}
              </v-card-text>

              <v-row justify="end">
                <v-col md="auto">
                  <v-card-actions>
                    <subscribe-button></subscribe-button>
                  </v-card-actions>
                </v-col>
                <v-col md="auto">
                  <v-card-actions>
                    <v-btn text>Répondre</v-btn>
                  </v-card-actions>
                </v-col>
              </v-row>
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
                <v-list-item-avatar
                  tile
                  size="60"
                  color="grey"
                >
                  <v-gravatar :email="answer.author.email" />
                </v-list-item-avatar>
                <v-list-item-content>
                  <div class="overline mb-4">
                    {{ answer.author.displayName }}
                  </div>
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

        <div>
          <v-text-field
            label="Votre réponse"
            v-model="typedContent"
            required
          ></v-text-field>
          <v-btn text style="color:white;">Répondre</v-btn>
        </div>

        <!-- End Wrapper  -->
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { forums, users } from "../firebase";

export default {
  name: "DebatePage",
  data: () => ({
    forum: {},
    author: { displayName: "Anonymous", email: "example@example.com" }
  }),
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
            .then((a) => {
              data.author = a.data();
              data.author.id = a.id;
            });
        
        });
      });
  }
};
</script>
