import { firebase } from "@firebase/app";
import "@firebase/app";
import "@firebase/auth";
import "@firebase/messaging";
import "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCkx9RJI1ZVzP2pZm9A1p0H_qUGV2f2lhQ",
  authDomain: "pocket-kulture.firebaseapp.com",
  databaseURL: "https://pocket-kulture.firebaseio.com",
  projectId: "pocket-kulture",
  storageBucket: "pocket-kulture.appspot.com",
  messagingSenderId: "782087725688",
  appId: "1:782087725688:web:ab0bc2582f99a16c65c38d"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();

const messaging = firebase.messaging();

db.enablePersistence().catch(err => {
  console.error(err);
});

const topics = db.collection("topics");
const users = db.collection("users");

export { db, auth, topics, users, messaging };
