<template>
  <div>
    <h2 class="text-h3">Edition de débat</h2>
    <v-container>
      <v-row justify="center">
        <v-col cols="12">
          <v-text-field
            name="title"
            required
            v-model="title"
            label="Titre"
          ></v-text-field>
          <v-textarea
            name="content"
            required
            v-model="content"
            label="Texte"
          ></v-textarea>
        </v-col>
        <v-col cols="3">
          <v-btn color="primary" @click="handleSubmit">Envoyer</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
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
          author: this.user.uid
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
