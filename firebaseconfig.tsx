// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDhEo9jtMYYHLTqESjr0PnZiLp4T68fIts",
  authDomain: "daeliminsta-a3078.firebaseapp.com",
  projectId: "daeliminsta-a3078",
  storageBucket: "daeliminsta-a3078.firebasestorage.app",
  messagingSenderId: "767723525447",
  appId: "1:767723525447:web:dfa4addbf22f560642a862",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//Initialize Firebase Authentication (인증관련 객체 만들기)
export const auth = initializeAuth(app);
