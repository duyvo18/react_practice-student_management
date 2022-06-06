import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../config/firebase.config";

export const login = async (email, password) => {
    await signInWithEmailAndPassword(getAuth(app), email, password)
        .then((userCresential) => {
            // TODO: resolve
        })
        .catch((error) => {
            // TODO: resolve
        });
}

export const signup = async (email, password) => {
    await createUserWithEmailAndPassword(getAuth(app), email, password)
        .then((userCresential) => {
            console.log(userCresential.user.email)
        })
        .catch((error) => {
            // TODO: resolve
        });
}