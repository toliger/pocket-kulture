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
                ></v-list-item-avatar>
                <v-list-item-content>
                  <div class="overline mb-4">
                    {{ subject.author ? subject.author : "Anonymous" }}
                  </div>
                  <v-list-item-title class="headline mb-1">{{
                    subject.title
                  }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-card-text>
                {{ subject.content }}
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
              v-for="(answer, idx) in $route.params.placeholder.answers"
            >
              <v-list-item three-line>
                <v-list-item-avatar
                  tile
                  size="60"
                  color="grey"
                ></v-list-item-avatar>
                <v-list-item-content>
                  <div class="overline mb-4">
                    {{ answer.author ? answer.author : "Anonymous" }}
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
export default {
  name: "DebatePage",
  data: () => ({
    typedContent: ""
  }),
  computed: {
    subject() {
      const { author, title, content } = this.$route.params.placeholder;
      return { author, title, content };
    }
  }
};
</script>
