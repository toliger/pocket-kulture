<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1>Notifications Push</h1>
        <v-list>
          <v-list-item>
            <v-list-item-title>
              Notifications Push
            </v-list-item-title>
            <v-list-item-action>
              <v-switch
                class="ml-3"
                v-model="status"
                @click="handleSwitch"
                readonly
                :disabled="
                  navigatorPush === 'denied' || navigatorPush === 'unsupported'
                "
              ></v-switch>
            </v-list-item-action>
          </v-list-item>
          <v-list-item>
            <v-btn @click="testPush">Test Push</v-btn>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>
              Topic modifié
            </v-list-item-title>
            <v-list-item-action>
              <v-switch
                class="ml-3"
                v-model="userData.notify_on_mod"
                @click="$store.dispatch('updateNotify', 'mod')"
                readonly
              ></v-switch>
            </v-list-item-action>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>
              Topic ajouté
            </v-list-item-title>
            <v-list-item-action>
              <v-switch
                class="ml-3"
                v-model="userData.notify_on_add"
                @click="$store.dispatch('updateNotify', 'add')"
                readonly
              ></v-switch>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapGetters } from "vuex";
import { urlBase64ToUint8Array } from "@/helpers";
import { users } from "@/firebase";

export default {
  name: "PushSettings",
  async mounted() {
    this.status = await this.subStatus();
  },
  data: () => ({
    status: false
  }),
  methods: {
    async subscribe() {
      const publicVapidKey = process.env.VUE_APP_VAPID_KEY;
      if ("serviceWorker" in navigator) {
        const register = await navigator.serviceWorker.ready;

        try {
          const subscription = await register.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
          });
          if (this.uid) {
            await users
              .doc(this.uid)
              .update({ push: JSON.stringify(subscription) });
          }
          this.status = true;
        } catch (err) {
          console.error(err);
        }
      } else {
        console.error("Service workers are not supported in this browser");
      }
    },
    unsubscribe() {
      navigator.serviceWorker.ready
        .then(reg => reg.pushManager.getSubscription())
        .then(async sub => {
          try {
            await sub.unsubscribe();
            this.status = false;
          } catch (err) {
            console.log(err);
          }
          if (this.uid) {
            await users.doc(this.uid).update({ push: null });
          }
        });
    },
    async testPush() {
      await fetch(`${process.env.VUE_APP_PUSH_ENDPOINT}/push`, {
        method: "POST",
        body: JSON.stringify({ uid: this.uid }),
        headers: {
          "Content-Type": "application/json"
        }
      });
    },
    async subStatus() {
      if (!("Notification" in window && navigator.serviceWorker)) {
        return false;
      }
      let permission = await Notification.requestPermission();
      if (permission != "granted") {
        return false;
      }
      let sub = await navigator.serviceWorker.ready.then(reg => {
        return reg.pushManager.getSubscription();
      });
      return !!sub;
    },
    handleSwitch() {
      this.status ? this.unsubscribe() : this.subscribe();
    }
  },
  computed: {
    ...mapGetters(["uid", "userData"]),
    navigatorPush() {
      // check notification status in browser (and support)
      if (!("Notification" in window && "serviceWorker" in navigator)) {
        return null;
      }
      return Notification.permission;
    }
  }
};
</script>
