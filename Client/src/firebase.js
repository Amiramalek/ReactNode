// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBN3Gc3s3yZRGVqMb8pUOxxHifcWza3gUM",
  authDomain: "appointment-be995.firebaseapp.com",
  projectId: "appointment-be995",
  storageBucket: "appointment-be995.firebasestorage.app",
  messagingSenderId: "567052741830",
  appId: "1:567052741830:web:e45e93a960e88c37e33bc7",
  measurementId: "G-2K5JGXE1WD"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider, signInWithPopup };
