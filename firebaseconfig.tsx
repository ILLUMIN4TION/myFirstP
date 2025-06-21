// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import RNStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

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

//Initialize Firebase Authentication (인증관련 객체 만들기) , 2번째 매개변수로 들어갈 값값
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(RNStorage),
});

//firebase의 db, firestore  초기화 ㅣㅊ 가져오기
export const firestore = getFirestore(app);

//firebase 의 대용량 미디어파이 ㄹ스토리지 초기화 및 가져오기

export const storage = getStorage(app);
