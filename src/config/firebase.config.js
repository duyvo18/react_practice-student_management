import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD1WUjg1NVxPGplkkrqcYvveRcACKW7yD0",
  authDomain: "react-student-management-923f5.firebaseapp.com",
  projectId: "react-student-management-923f5",
  storageBucket: "react-student-management-923f5.appspot.com",
  messagingSenderId: "453979413926",
  appId: "1:453979413926:web:46f1f8c1513cf11f3dc367"
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

const firestore = getFirestore(app);

export { app, firestore };