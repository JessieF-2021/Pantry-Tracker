
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAyIQKDIRUESuvf0vgCICtQsHTeUb6fY6w",
  authDomain: "pantry-tracker-64dbe.firebaseapp.com",
  projectId: "pantry-tracker-64dbe",
  storageBucket: "pantry-tracker-64dbe.appspot.com",
  messagingSenderId: "955398945968",
  appId: "1:955398945968:web:17a0efa8f9a6545d86cf75",
  measurementId: "G-6T7H6894EP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log("Firebase initialized:", app);
// const analytics = getAnalytics(app);

export const db = getFirestore(app);