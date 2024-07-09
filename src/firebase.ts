// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC4FhuFDZLyUtZy1OBSBNJSCN9OdulShFw",
  authDomain: "vizcom-6a8e0.firebaseapp.com",
  projectId: "vizcom-6a8e0",
  storageBucket: "vizcom-6a8e0.appspot.com",
  messagingSenderId: "359203148947",
  appId: "1:359203148947:web:e0c35c5ebd0b75dea46966",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);

export const db = getFirestore(app);
