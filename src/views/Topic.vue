<template>
  <div class="topic">
    <h1>{{ top.title }}</h1>
    <iframe
      style="width:100%;height:500px"
      sandbox="allow-same-origin allow-scripts"
      :src="top.vsrc"
      frameborder="0"
      allowfullscreen
    ></iframe>

    <v-container>
      <v-row justify="center">
        <v-col cols="12">

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
                      <!-- {{ subject.author ? subject.author : "Anonymous" }} -->
                      <p> Auteur du post </p>
                    </div>
                    <v-list-item-title class="headline mb-1">{{
                      topic.titre
                    }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-card-text>
                  {{ topic.description }}
                </v-card-text>

                <v-row justify="end">
                  <v-col md="auto">
                    <v-card-actions>
                      <subscribe-button></subscribe-button>
                    </v-card-actions>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>


        </v-col>
      </v-row>
    </v-container>

  </div>
</template>
<script>
import { topics } from "../firebase";

export default {
  data() {
    return {
      iframe: {
        src:
          "https://peer.tube/videos/embed/b59eda45-ec9c-4aaf-ad4c-ee45469bcafb"
      },
      topic: {
        titre:
          "Altercation entre Alkpote et le Roi Heenok dans ail et fines herbes",
        description:
          "Comment cette vidéo m'a aidé pour réviser mon bac de philosophie"
      },
      top: {}
    };
  },
  mounted() {
    topics.doc(this.$route.params.topicId)
      .get().then(data => {
        this.top = data.data();
        this.top.id = data.id;
      });
  }
};
</script>
