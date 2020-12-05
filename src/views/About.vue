<template>
  <div class="about">
    <h1>This is an about page</h1>
    <router-link to="Login">Login</router-link>
    <v-btn @click="triggerPushNotification"> Sub to notifications</v-btn>
    <v-btn @click="testPush">Test Push</v-btn>
    <p>Sub status: {{ status }}</p>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { urlBase64ToUint8Array } from "@/helpers";
import { users } from "@/firebase";

export default {
  name: "About",
  async mounted() {
    console.log("plop");
    this.status = await this.subStatus();
  },
  data: () => ({
    status: "..."
  }),
  methods: {
    async triggerPushNotification() {
      const publicVapidKey =
        "BLcT9G1Uw20uKfxyKD5H3DwVUP8_a6weZ5QZuqfRvM2-Hisa0bBDgn8ho2zMHMJ53FYouWx7jUjmtM4vglV9epc";
      if ("serviceWorker" in navigator) {
        const register = await navigator.serviceWorker.ready;

        const subscription = await register.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
        });

        await fetch("https://pocket-kulture.fr/api/subscribe", {
          method: "POST",
          body: JSON.stringify(subscription),
          headers: {
            "Content-Type": "application/json"
          }
        });

        if (this.uid) {
          await users
            .doc(this.uid)
            .update({ push: JSON.stringify(subscription) });
        }
      } else {
        console.error("Service workers are not supported in this browser");
      }
    },
    async testPush() {
      await fetch("https://pocket-kulture.fr/api/push", {
        method: "POST",
        body: JSON.stringify({ uid: this.uid }),
        headers: {
          "Content-Type": "application/json"
        }
      });
    },
    async subStatus() {
      console.log("plops");
      if (!("Notification" in window && navigator.serviceWorker)) {
        return "Not available";
      }
      let permission = await Notification.requestPermission();
      if (permission != "granted") {
        return "Not granted";
      }
      let sub = await navigator.serviceWorker.ready.then(reg => {
        return reg.pushManager.getSubscription();
      });
      if (sub) {
        return "Subbed";
      }
      return "Not subbed";
    }
  },
  computed: {
    ...mapGetters(["token", "uid"])
  }
};
</script>
