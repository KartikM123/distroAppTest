import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database'; // For Realtime Database
import { getFirestore } from 'firebase/firestore'; // For Firestore

const firebaseConfig = {
    apiKey: "AIzaSyC2sBL_KjOB9HaDtgz6FoIuQtID4qAyijc",
    authDomain: "distroapp-d4de7.firebaseapp.com",
    projectId: "distroapp-d4de7",
    storageBucket: "distroapp-d4de7.firebasestorage.app",
    messagingSenderId: "980722805959",
    appId: "1:980722805959:web:69a3b4e19edc6477bea2e2"
  };

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app); // Realtime Database
export const firestore = getFirestore(app); // Firestore