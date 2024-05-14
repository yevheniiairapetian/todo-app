// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getFirestore } from 'firebase/firestore';
import {getDatabase} from 'firebase/database';
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyClvFmMGV3y5r_9Im6R81VJ0jshPlqU0VU",
  authDomain: "fir-to-do-app-2e968.firebaseapp.com",
  databaseURL: "https://fir-to-do-app-2e968-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "fir-to-do-app-2e968",
  storageBucket: "fir-to-do-app-2e968.appspot.com",
  messagingSenderId: "742407935511",
  appId: "1:742407935511:web:2c50fe9258a5a4f8c4ae52",
  measurementId: "G-G25WL6E4TM"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getDatabase(app);
export const auth = getAuth();