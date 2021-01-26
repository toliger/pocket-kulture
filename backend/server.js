require("dotenv").config({ path: ".env" });

const express = require("express");
const webPush = require("web-push");
const bodyParser = require("body-parser");
const cors = require("cors");
const admin = require("firebase-admin");

const serviceAccount = require("./serverKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const httpPort = 9001;

const app = express();
app.use(bodyParser.json());
app.use(cors());

const publicVapidKey = process.env.PUBLIC_VAPID_KEY;
const privateVapidKey = process.env.PRIVATE_VAPID_KEY;

webPush.setVapidDetails(
  "mailto:test@example.com",
  publicVapidKey,
  privateVapidKey
  );
  
app.get("/", async (req, res) => {
  const snapshot = await db.collection("users").get();
  snapshot.forEach(doc => {
    console.log(doc.id, "=>", doc.data());
  });
  res.send("UP");
});

// Listen on new topic

const topics = db.collection("topics");
topics.onSnapshot(querySnapshot => {
  querySnapshot.docChanges().forEach(change => {
    if (change.type === "added" || change.type === "modified") {
      const newTopic = change.doc.data();
      console.log(
        `Topic "${newTopic.title}" ${change.type} by ${newTopic.artist}`
      );
      if (!newTopic.tags) {
        return;
      }
      const usersToNotify = db
        .collection("users")
        .where("interests", "array-contains-any", newTopic.tags);
      usersToNotify.get().then(snapshot => {
        if (!snapshot.empty) {
          snapshot.forEach(doc => {
            if (change.type === "modified" && doc.get("notify_on_mod")) {
              console.log("Shoud notify " + doc.id);
              const sub = doc.get("push");
              if (sub) {
                webPush
                  .sendNotification(
                    JSON.parse(sub),
                    JSON.stringify({
                      title: "Topic modified !"
                    })
                  )
                  .catch(error => console.error(error));
              }
            }
            if (change.type === "added" && doc.get("notify_on_add")) {
              console.log("Shoud notify " + doc.id);
              const sub = doc.get("push");
              if (sub) {
                webPush
                  .sendNotification(
                    JSON.parse(sub),
                    JSON.stringify({
                      title: "Topic added !"
                    })
                  )
                  .catch(error => console.error(error));
              }
            }
          });
        }
      });
    }
  });
});

app.post("/push", async (req, res) => {
  const snapshot = await db
    .collection("users")
    .doc(req.body.uid)
    .get();
  if (snapshot.exists) {
    console.log("user found");
    const sub = snapshot.data().push;
    if (sub) {
      webPush
        .sendNotification(JSON.parse(sub), JSON.stringify({ title: "plop" }))
        .catch(error => console.error(error));
    }
  }
  res.send("sent");
});

app.listen(httpPort, async () => {
  console.log(`Listening on port ${httpPort}!`);
});
