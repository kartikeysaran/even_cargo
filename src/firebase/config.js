// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB_R_EnF8JFxt3utW5e9TdBQfE0sm3A3fY",
  authDomain: "even-gigs.firebaseapp.com",
  projectId: "even-gigs",
  storageBucket: "even-gigs.firebasestorage.app",
  messagingSenderId: "276062138576",
  appId: "1:276062138576:web:43c75c2fd6ce0ed4cb6ed5",
  measurementId: "G-S2TE34SNJS"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);