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
  </div>
</template>
<script>
import { topics } from "../firebase";

export default {
  data() {
    return {
      top: {},
    };
  },
  mounted() {
    topics.doc(this.$route.params.topicId).get().then(data => {
      this.top = data.data();
      this.top.id = data.idres.id;
    });
  }
};
</script>
