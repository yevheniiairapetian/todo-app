// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDydifOmsKLVfV71w41duoq1hsbkhHtlzU",
  authDomain: "to-do-app-fcb75.firebaseapp.com",
  projectId: "to-do-app-fcb75",
  storageBucket: "to-do-app-fcb75.appspot.com",
  messagingSenderId: "671713783092",
  appId: "1:671713783092:web:0967746ecb8c3c6a1f4961",
  measurementId: "G-XMWJEDL28V"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(firebaseApp);
