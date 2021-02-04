import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAHtTDYatS9FA8jl7DsEhMWccqAauzinNI",
  authDomain: "mealrecorder-6bbe0.firebaseapp.com",
  databaseURL:
    "https://mealrecorder-6bbe0-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "mealrecorder-6bbe0",
  storageBucket: "mealrecorder-6bbe0.appspot.com",
  messagingSenderId: "300917548512",
  appId: "1:300917548512:web:4f3a2862b14ae6fcda3785",
  measurementId: "G-RLG2ZDZ5QB",
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

const storage = firebase.storage();

export { storage, firebase as default };
