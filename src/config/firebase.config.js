import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = JSON.parse(process.env.REACT_APP_FIREBASE_CONFIG)

console.log(getApps().length)
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
console.log(getApps().length)

const firestore = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { app, firestore, storage, auth };