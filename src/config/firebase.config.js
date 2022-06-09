import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD1WUjg1NVxPGplkkrqcYvveRcACKW7yD0",
  authDomain: "react-student-management-923f5.firebaseapp.com",
  projectId: "react-student-management-923f5",
  storageBucket: "react-student-management-923f5.appspot.com",
  messagingSenderId: "453979413926",
  appId: "1:453979413926:web:46f1f8c1513cf11f3dc367"
};

console.log(getApps().length)
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
console.log(getApps().length)

const firestore = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { app, firestore, storage, auth };