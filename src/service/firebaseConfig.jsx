// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAkf2sGXnEDOdZKdyvMfTJqobJwrf1Jm3A",
  authDomain: "ai-travel-planner-eb792.firebaseapp.com",
  projectId: "ai-travel-planner-eb792",
  storageBucket: "ai-travel-planner-eb792.firebasestorage.app",
  messagingSenderId: "1049864123371",
  appId: "1:1049864123371:web:127bf51d5216dae3781fae",
  measurementId: "G-448ZYPX8TT"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db= getFirestore(app);
//const analytics = getAnalytics(app);