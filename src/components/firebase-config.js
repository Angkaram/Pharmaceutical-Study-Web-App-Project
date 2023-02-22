import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAju2EoNRnR8urECXTqfW6ug9-u4_tTKO8",
    authDomain: "pharma-study-auth.firebaseapp.com",
    projectId: "pharma-study-auth",
    storageBucket: "pharma-study-auth.appspot.com",
    messagingSenderId: "600975207953",
    appId: "1:600975207953:web:e7ec97e0b73f96b3388bb0",
    measurementId: "G-3L2F5Q6E5N"
  };

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);