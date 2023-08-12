// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
//import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {
    apiKey: "AIzaSyDaKljg440TaXeCrNxqlMUWlCyKc9pU7wY",
    authDomain: "vsnitclub-cff41.firebaseapp.com",
    projectId: "vsnitclub-cff41",
    storageBucket: "vsnitclub-cff41.appspot.com",
    messagingSenderId: "733757028655",
    appId: "1:733757028655:web:9fc3dc5b2854f5062989da",
    measurementId: "G-ZJ1FMJSCF7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const AuthState = (callback) => onAuthStateChanged(auth, callback);
export const storage = getStorage();
export const db = getFirestore();


//const analytics = getAnalytics(app);