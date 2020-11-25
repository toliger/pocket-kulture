<template>
  <v-container>
    <v-row>
      <v-col cols="12" v-for="(item, idx) in placeholders" :key="idx">
        <v-card color="#385F73" dark>
          <v-card-title class="headline">
            {{ item.title }}
          </v-card-title>

          <v-card-subtitle>{{ item.desc }}</v-card-subtitle>

          <v-card-actions>
            <v-btn text> Listen Now </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  name: "Debates",

  components: {},

  data: () => ({
    placeholders: [
      {
        title: "Soleil dans la bulle",
        desc: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Etiam venenatis nibh eget turpis bibendum laoreet. Nulla consequat nisl turpis, vitae gravida justo vulputate vel.
      Ut ultricies velit a eros maximus convallis. Fusce sed auctor lorem. Nam volutpat lobortis nisl eget sagittis.`
      },
      {
        title: "Sous le prado",
        desc: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Etiam venenatis nibh eget turpis bibendum laoreet. Nulla consequat nisl turpis, vitae gravida justo vulputate vel.
      Ut ultricies velit a eros maximus convallis. Fusce sed auctor lorem. Nam volutpat lobortis nisl eget sagittis.`
      },
      {
        title: "Shifter PRO",
        desc: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Etiam venenatis nibh eget turpis bibendum laoreet. Nulla consequat nisl turpis, vitae gravida justo vulputate vel.
      Ut ultricies velit a eros maximus convallis. Fusce sed auctor lorem. Nam volutpat lobortis nisl eget sagittis.`
      }
    ]
  })
};
</script>
