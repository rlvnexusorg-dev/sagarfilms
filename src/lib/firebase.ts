
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCZYpBCOG_0fppIWDfmjxOBs4W6alED30Y",
  authDomain: "sagarfilmsstudio-f3f70.firebaseapp.com",
  projectId: "sagarfilmsstudio-f3f70",
  storageBucket: "sagarfilmsstudio-f3f70.firebasestorage.app",
  messagingSenderId: "874131932054",
  appId: "1:874131932054:web:96623673fb5f7e43dcd3b7",
  measurementId: "G-TT7ZZPL3M2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

// In a Next.js app, Firebase Analytics should only be initialized on the client side.
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

export { app, auth, firestore, analytics };
