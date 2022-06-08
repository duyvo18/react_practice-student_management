import { addDoc, collection, getDocs, query, where, orderBy, getDocsFromServer } from "firebase/firestore";
import { firestore } from "../config/firebase.config";

export const addNewStudent = async (email, id, firstname, lastname, startingYear) => {
    const studentRef = collection(firestore, "students");
    const data = {
        "email": email,
        "id": id,
        "firstname": firstname,
        "lastname": lastname,
        "startingYear": startingYear,
    };
    await addDoc(studentRef, data)
        .catch((error) => console.log(error));
}

export const getAllStudents = async () => {
    const students = await getDocsFromServer(
        query(collection(firestore, "students"), orderBy("id"))
    ).catch(error => console.log(error));

    return students.docs.map(doc => doc.data());
};

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
