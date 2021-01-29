<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h2 class="text-h4 overline mb-2 text-center">Edition de débat</h2>
        <v-divider></v-divider>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12">
        <v-text-field
          name="title"
          required
          v-model="title"
          label="Titre"
          outlined
        ></v-text-field>
        <v-textarea
          name="content"
          required
          v-model="content"
          label="Texte"
          outlined
        ></v-textarea>
      </v-col>
      <v-col cols="3">
        <v-btn color="primary" @click="handleSubmit">Envoyer</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { forums } from "../firebase";
import { mapGetters } from "vuex";

export default {
  name: "addDebate",
  data: () => ({
    title: "",
    content: ""
  }),
  methods: {
    handleSubmit() {
      forums
        .add({
          content: this.content,
          title: this.title,
          author: this.user.uid,
          answers: []
        })
        .then(({ id }) => {
          this.$router.push({ name: "Debate", params: { forumId: id } });
        })
        .catch(err => {
          console.error(err);
        });
    }
  },
  computed: {
    ...mapGetters(["user"])
  }
};
</script>
