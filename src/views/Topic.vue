<template>
  <div class="topic">
    <iframe
      v-if="top.vsrc"
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
                  <v-list-item-avatar tile size="80" color="grey">
                    <v-img :src="top.src"></v-img>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title
                      class="headline mb-1"
                      style="white-space: normal;"
                      >{{ top.title }}</v-list-item-title
                    >
                  </v-list-item-content>
                </v-list-item>
                <v-card-text>
                  <vue-markdown :source="top.descr" />
                </v-card-text>
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
import VueMarkdown from "vue-markdown";

export default {
  components: {
    VueMarkdown
  },
  data() {
    return {
      top: {}
    };
  },
  mounted() {
    topics
      .doc(this.$route.params.topicId)
      .get()
      .then(data => {
        this.top = data.data();
        this.top.id = data.id;
        this.top.descr = this.top.descr.replace(/ {2,}/g, "\n\n");
      });
  }
};
</script>
