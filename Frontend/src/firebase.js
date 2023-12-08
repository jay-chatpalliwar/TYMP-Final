// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyDO8Lhazg--1JHwI8qqXtP59lN9kV9WyU0",
  authDomain: "gradesarthi.firebaseapp.com",
  projectId: "gradesarthi",
  storageBucket: "gradesarthi.appspot.com",
  messagingSenderId: "597442792727",
  appId: "1:597442792727:web:6c7b5b23a777ea71cf3b52"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);