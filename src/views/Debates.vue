<template>
  <v-container>
    <v-row>
      <v-col cols="12" v-for="(item, idx) in placeholders" :key="idx">
        <v-card color="#385F73" dark>
          <v-card-title class="headline">
            {{ item.title }}
          </v-card-title>

          <v-card-subtitle>{{ item.content }}</v-card-subtitle>

          <v-card-actions>
            <v-btn
              text
              link
              :to="{ name: 'Debate', params: { placeholder: item } }"
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
export default {
  name: "Debates",

  components: {},

  data: () => ({
    placeholders: [
      {
        author: "loupdewallstrt",
        title:
          "Jouer au Monopoly ou comment comprendre les stratégies d’investissements",
        content: `Je me suis retrouvé la semaine dernière à Noël avec mon cousin Jérôme.
        Après des heures d’ennui, il a décidé de sortir le Monopoly de Mémé.
        Après 3 tours, le mec a refusé d’acheter une gare, JAMAIS tu refuses d’acheter une gare !
        Il m’a alors expliqué que le Monopoly c’est comme son boulot chez Goldman Sachs,
        tu étudies l’environnement et les possibilités de développer le patrimoine avant d’investir :
        la gare St-Lazare est trop peu chère alors qu’elle est à côté de la Rue de la Paix,
        en gare tu peux pas développer le terrain etc…
        Vous en pensez quoi ?`,
        answers: [
          {
            author: "Marcc75",
            content:
              "Super intéressant j’y avais jamais pensé, je suis sûr que Stéphane Plaza doit être champion de France dans ce cas ! Plus sérieusement je pense que le monopoly en dit aussi beaucoup sur la société et le comportement du consommateur vis-à-vis de l’argent et vis-à-vis des autres…"
          },
          {
            author: "Yvesdu38",
            content:
              "Ton cousin parle trop loin je pense, le monopoly c’est juste un jeu non ?"
          }
        ]
      },
      {
        author: "Tim Authai",
        title: "Ce que Call of Duty m’a appris sur l’entreprenariat",
        content: `Il y a quelques semaines, on passait une nuit tranquille à la maison et ma moitié jouait à Call of Duty (COD).
        Je voulais essayer, alors j’ai téléchargé l’application sur mon téléphone…
        Comme tout autre jeu bien conçu, celui-ci est destiné à vous faire rester des heures dans l’app.
        Ce que j’ai donc fait #DésoPasDéso — ce qui s’est passé ensuite est la partie intéressante de cette histoire.
        Je discutais d’entrepreneuriat avec un ami qui disait : « En entreprise, il faut continuer à bouger tout le temps ».
        Et la première pensée qui m’est venue en tête a été : « Comme dans Call of Duty ». Cela m’a donné envie de creuser un peu la question et voici ce que COD m’a appris en matière de gestion d’entreprise… »`,
        answers: [
          {
            author: "Marcc75",
            content:
              "Je trouve que ça en dit énormément sur l’esprit d’équipe. Le mode capture de drapeau c’est comme un sprint entrepreneurial, faut pouvoir compter les uns sur les autres, chacun a son rôle, doit tenir sa position malgré les imprévus comme quand les autres te choppent le drapeau…"
          },
          {
            author: "Yvesdu38",
            content: "Même pour le mode zombie, ça peut souligner…"
          }
        ]
      },
      {
        author: "Luke Brown",
        title:
          "Critique de la dernière vidéo sur House of Cards et les élections",
        content: `J’étais super content d’avoir une vidéo sur house of cards, j’ai vraiment adoré cette série. Mais il y’a un point que je n’ai pas trop compris : Pourquoi… `,
        answers: [
          {
            author: "Marcc75",
            content:
              "Super question ! En fait aux états unis, il y’a la règle du « winner takes it all ». C’est pour ça que Clinton…"
          },
          {
            author: "Yvesdu38",
            content: "Ah c’est tout de suite plus clair merci beaucoup !"
          }
        ]
      }
    ]
  })
};
</script>
