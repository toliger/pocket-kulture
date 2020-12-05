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

const doc = db.collection("users").doc("y6CpU0ak85WYRMeEDMDfpjp9jKJ3");

doc.onSnapshot(
  docSnapshot => {
    console.log(`Received doc snapshot: ${docSnapshot}`);
    console.log(docSnapshot.data());
  },
  err => {
    console.log(`Encountered error: ${err}`);
  }
);

app.post("/subscribe", async (req, res) => {
  const subscription = req.body;
  res.status(201).json({});

  const payload = JSON.stringify({
    title: "Push notifications with Service Workers"
  });

  webPush
    .sendNotification(subscription, payload)
    .catch(error => console.error(error));
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
