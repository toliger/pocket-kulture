<template>
  <div class="about">
    <h1>This is an about page</h1>
    <router-link to="Login">Login</router-link>
    <v-btn @click="getMessagingToken">Notifications</v-btn>
  </div>
</template>
<script>
import { messaging } from "@/firebase";
import { mapGetters } from "vuex";

export default {
  name: "About",
  methods: {
    getMessagingToken() {
      messaging
        .getToken()
        .then(async token => {
          if (token) {
            const currentMessageToken = window.localStorage.getItem(
              "messagingToken"
            );
            console.log("token will be updated", currentMessageToken != token);

            if (currentMessageToken != token) {
              await this.saveToken(token);
            }
          } else {
            console.log(
              "No Instance ID token available. Request permission to generate one."
            );
            this.notificationsPermisionRequest();
          }
        })
        .catch(function(err) {
          console.log("An error occurred while retrieving token. ", err);
        });
    },
    notificationsPermisionRequest() {
      messaging
        .requestPermission()
        .then(() => {
          this.getMessagingToken();
        })
        .catch(err => {
          console.log("Unable to get permission to notify.", err);
        });
    },
    listenTokenRefresh() {
      const currentMessageToken = window.localStorage.getItem("messagingToken");
      console.log("currentMessageToken", currentMessageToken);
      if (currentMessageToken) {
        messaging.onTokenRefresh(function() {
          messaging
            .getToken()
            .then(function(token) {
              this.saveToken(token);
            })
            .catch(function(err) {
              console.error("Unable to retrieve refreshed token ", err);
            });
        });
      }
    },
    saveToken(token) {
      console.log("tokens", token);
      fetch(
        `http://localhost:5001/pocket-kulture/us-central1/GeneralSubscription`,
        { method: "post", body: token }
      )
        .then(response => {
          window.localStorage.setItem("messagingToken", token);
          console.log(response);
        })
        .catch(err => {
          console.error(err);
        });
    }
  },
  computed: {
    ...mapGetters["token"]
  }
};
</script>
