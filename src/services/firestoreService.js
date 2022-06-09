import { addDoc, collection, doc, getDocs, query, where, orderBy, getDocsFromServer, setDoc } from "firebase/firestore";
import { firestore } from "../config/firebase.config";

export const addNewStudent = async (email) => {
    const studentRef = collection(firestore, "students");
    const serverData = {
        "email": email,
        "_new": "1"
    };
    try {
        const docRef = await addDoc(studentRef, serverData)
        return docRef.path;
    } catch (e) {
        // TODO: Popup error
        console.log(e)
    }
}

export const setStudentInfo = async (docPath, data) => {
    const docRef = doc(firestore, docPath);

    const serverData = {
        "id": data.id || "",
        "firstname": data.firstname || "",
        "lastname": data.lastname || "",
        "startingYear": data.startingYear || "",
        "_new": data._new || "1"
    };

    await setDoc(docRef, serverData)
}

export const getAllStudents = async () => {
    const students = await getDocsFromServer(
        query(collection(firestore, "students"), orderBy("id"), where("_new", "!=", "1"))
    ).catch(error => console.log(error));

    return students.docs.map(doc => doc.data());
};

export const queryStudentByEmail = async (email) => {
    const studentRef = collection(firestore, "students");
    const studentQuery = query(studentRef);

    try {
        const querySnapshot = await getDocs(studentQuery, where("email", "==", email));
        return studentRef.path + '/' + querySnapshot.docs[0].id;
    } catch (e) {
        // TODO: Popup error
        console.log(e)
    }
}

export const queryStudentById = async (id) => {
    const studentRef = collection(firestore, "students");
    const studentQuery = query(studentRef);

    const querySnapshot = await getDocs(studentQuery, where("id", "==", id))
        .catch(error => console.log(error));
    return querySnapshot.docs.map(doc => doc.data());
}

export const queryStudentByLastname = async (lastname) => {
    const studentRef = collection(firestore, "students");
    const studentQuery = query(studentRef);

    const querySnapshot = await getDocs(studentQuery, where("lastname", "==", lastname))
        .catch(error => console.log(error));
    return querySnapshot.docs.map(doc => doc.data());
};

export const queryStudentByFirstname = async (firstname) => {
    const studentRef = collection(firestore, "students");
    const studentQuery = query(studentRef);

    const querySnapshot = await getDocs(studentQuery, where("firstname", "==", firstname))
        .catch(error => console.log(error));
    return querySnapshot.docs.map(doc => doc.data());
};

export const queryStudentByStartingYear = async (year) => {
    const studentRef = collection(firestore, "students");
    const studentQuery = query(studentRef);

    const querySnapshot = await getDocs(studentQuery, where("startingYear", "==", year))
        .catch(error => console.log(error));
    return querySnapshot.docs.map(doc => doc.data());
};