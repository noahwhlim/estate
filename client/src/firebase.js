// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "estate-cf55d.firebaseapp.com",
  projectId: "estate-cf55d",
  storageBucket: "estate-cf55d.appspot.com",
  messagingSenderId: "101532895035",
  appId: "1:101532895035:web:11fe889930f842b486991e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);