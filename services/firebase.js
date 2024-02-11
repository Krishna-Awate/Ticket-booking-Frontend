"use client";

// firebase.js
import * as firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBmAjdFmK-go-rgyktg_nf3AQchwHGvrvA",
  //   authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "ticket-booking-app-ef7b0",
  //   storageBucket: "YOUR_STORAGE_BUCKET",
  //   messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  //   appId: "YOUR_APP_ID",
};

console.log("firebase", firebase);

if (!firebase?.apps?.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
