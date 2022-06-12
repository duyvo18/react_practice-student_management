import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase.config";

export const login = async (email, password) => {
    try {
        return await signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
        console.log(e);
    }
}

export const signup = async (email, password) => {
    try {
        return await createUserWithEmailAndPassword(auth, email, password)
    } catch (e) {
        console.log(e)
    }
}