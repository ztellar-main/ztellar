// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBnpSbWM8Y-LeU3HMQmoX8z9fue3kuXV7Q",
  authDomain: "ztellar-11a4f.firebaseapp.com",
  projectId: "ztellar-11a4f",
  storageBucket: "ztellar-11a4f.appspot.com",
  messagingSenderId: "671791587363",
  appId: "1:671791587363:web:e3f47d902031981ff39196",
  measurementId: "G-5PCVE8SX9S",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);

export const db = getFirestore(app);
