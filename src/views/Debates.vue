<template>
  <v-container>
    <v-row>
      <v-col cols="12" v-for="(item, idx) in forums" :key="idx">
        <v-card color="#385F73" dark>
          <v-card-title class="headline">
            {{ item.title }}
          </v-card-title>

          <v-card-subtitle>{{ item.content }}</v-card-subtitle>

          <v-card-actions>
            <v-btn
              text
              link
              :to="{ name: 'Debate', params: { forumId: item.id } }"
            >
              Voir
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { forums } from "../firebase";

export default {
  name: "Debates",

  mounted() {
    forums.get().then(data => {
      this.forums = data.docs.map(doc => {
        let res = doc.data();
        res.id = doc.id;
        return res;
      });
    });
  },

  data: () => ({
    forums: []
  })
};
</script>
