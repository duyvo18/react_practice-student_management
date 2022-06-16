import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase.config";

export const loginWithEmail = async (email, password) => {
    try {
        return await signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
        throw(e);
    }
}

export const signupWithEmail = async (email, password) => {
    try {
        return await createUserWithEmailAndPassword(auth, email, password);
    } catch (e) {
        throw(e);
    }
}