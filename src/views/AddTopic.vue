<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h2 class="text-h4 overline mb-2 text-center">Edition de topic</h2>
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
        <v-text-field
          name="img"
          v-model="img_url"
          label="URL de l'image"
          outlined
        ></v-text-field>
        <v-text-field
          name="video"
          v-model="video_url"
          label="URL de la vidéo"
          outlined
        ></v-text-field>
        <v-select
          v-model="tags"
          :items="categories"
          chips
          deletable-chips
          multiple
          label="Tags"
          outlined
        >
          <template v-slot:selection="data">
            <v-chip
              v-bind="data.attrs"
              :input-value="data.selected"
              :color="data.item.color"
              @click="data.select"
            >
              {{ data.item.text }}
            </v-chip>
          </template>
        </v-select>
        <v-textarea
          name="content"
          required
          v-model="descr"
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
import { topics } from "../firebase";
import { mapGetters } from "vuex";

export default {
  name: "addTopic",
  data: () => ({
    title: "",
    descr: "",
    tags: [],
    video_url: "",
    img_url: "",
    categories: [
      // text and value fields mandatory for autocomplete
      { text: "Sciences", value: "sciences", color: "primary" },
      { text: "Politique", value: "politics", color: "primary" },
      { text: "Nature", value: "nature", color: "secondary" },
      { text: "Art", value: "art", color: "primary" },
      { text: "Histoire", value: "history", color: "primary" },
      { text: "Miam", value: "food", color: "secondary" }
    ]
  }),
  methods: {
    handleSubmit() {
      let randomColor = Math.floor(Math.random() * 16777215).toString(16);
      topics
        .add({
          artist: this.user.displayName,
          descr: this.descr,
          title: this.title,
          src: this.img_url,
          vsrc: this.video_url,
          author_id: this.user.uid,
          tags: this.tags,
          color: `#${randomColor}`
        })
        .then(({ id }) => {
          this.$router.push({ name: "Topic", params: { topicId: id } });
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
