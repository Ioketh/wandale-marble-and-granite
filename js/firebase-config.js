// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDxN4lnmAXW5h5iv4LUCB1HV6MW_Cq54uU",
  authDomain: "wandale-marble.firebaseapp.com",
  projectId: "wandale-marble",
  storageBucket: "wandale-marble.firebasestorage.app",
  messagingSenderId: "163920984777",
  appId: "1:163920984777:web:217d6c73b7684012ed2b18",
  measurementId: "G-L8DQ6E45EH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);