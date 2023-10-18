import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAYIoFi6vj32iv8UYH_Wpb77jB_5HLZcWY",
  authDomain: "cuisine-cash.firebaseapp.com",
  projectId: "cuisine-cash",
  storageBucket: "cuisine-cash.appspot.com",
  messagingSenderId: "958479290565",
  appId: "1:958479290565:web:a82226310fcb4897b360ac",
  measurementId: "G-RGPGDN7SDW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
