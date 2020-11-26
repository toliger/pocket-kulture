<template>
  <div class="topic">
    <h1>{{ this.$route.params.topicId }}</h1>
    <iframe style="width:100%;height:500px" sandbox="allow-same-origin allow-scripts" :src="iframe.src" frameborder="0" allowfullscreen></iframe>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        iframe: {
          src: "https://peer.tube/videos/embed/b59eda45-ec9c-4aaf-ad4c-ee45469bcafb",
        }
      }
    },
  }
</script>

