// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { getMessaging, getToken, onMessage } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging.js";

export const firebaseConfig = {
  apiKey: "AIzaSyDIH9HELH9xeKlkGKgCHeijL2-47Y1D8yY",
  authDomain: "xbox-b9d32.firebaseapp.com",
  projectId: "xbox-b9d32",
  storageBucket: "xbox-b9d32.firebasestorage.app",
  messagingSenderId: "708796067849",
  appId: "1:708796067849:web:2c64c21af8b094d4bac8d8"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const messaging = getMessaging(app);
