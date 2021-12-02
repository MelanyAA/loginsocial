import firebase from "firebase/compat/app";
import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
} from "firebase/auth";
import "firebase/compat/firestore";
// import { getFirestore } from "firebase/firestore/lite";
import { getFirestore } from "firebase/firestore";

import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyB3agqmrfRVwVhx485LrwZjCU7AcEUER04",
  authDomain: "react-app-curso-43edd.firebaseapp.com",
  projectId: "react-app-curso-43edd",
  storageBucket: "react-app-curso-43edd.appspot.com",
  messagingSenderId: "273048194119",
  appId: "1:273048194119:web:32599bc7f07094724f3562",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
console.log("Aqui confix");
const googleAuthProvider = new GoogleAuthProvider();
const facebookAuthProvider = new FacebookAuthProvider();

export {
  db,
  googleAuthProvider,
  facebookAuthProvider,
  firebase,
  updateProfile,
  signInWithEmailAndPassword,
  onAuthStateChanged,
};
