// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-2c13a.firebaseapp.com",
  projectId: "mern-blog-2c13a",
  storageBucket: "mern-blog-2c13a.appspot.com",
  messagingSenderId: "245273619741",
  appId: "1:245273619741:web:1885429a5ca0652f4ec5f4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);