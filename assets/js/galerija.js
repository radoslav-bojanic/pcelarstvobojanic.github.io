import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-analytics.js";
import { } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-storage.js";
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyB-bQxxyN3bekbN17l80A7dyA9ycIP5VZc",
    authDomain: "pcelarstvobojanicproject.firebaseapp.com",
    projectId: "pcelarstvobojanicproject",
    storageBucket: "pcelarstvobojanicproject.appspot.com",
    messagingSenderId: "297939220343",
    appId: "1:297939220343:web:6a1436eb101e1e49be5372",
    measurementId: "G-R3549TTWVS"
  };

  // Initialize Firebase
const app = initializeApp(firebaseConfig);
const store = firebase.storage();