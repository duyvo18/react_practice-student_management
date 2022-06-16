import { storage, firestore } from "../config/firebase.config";
import { ref, getDownloadURL } from "firebase/storage"
import { doc, getDocFromServer } from "firebase/firestore"

export const getDefaultAvatar = async () => {
    try {
        const docRef = doc(firestore, "utils/parameters")
        const docSnapshot = await getDocFromServer(docRef)
        const storagePath = docSnapshot.data().defaultAva;
        const storageRef = ref(storage, storagePath)
        return await getDownloadURL(storageRef);
    } catch (e) {
        console.error(e);
        throw e;
    }
}

export const getImageFromSource = async (pathRef) => {
    try {
        const storageRef = ref(storage, pathRef);
        return await getDownloadURL(storageRef);
    } catch (e) {
        console.error(e);
        throw e;
    }
}