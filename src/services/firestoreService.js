import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../config/firebase.config";

export const addNewStudent = async (email, id, firstname, lastname, startingYear) => {
    const studentRef = collection(firestore, "/students");
    await addDoc(studentRef, {
        "email": email,
        "id": id,
        "firstname": firstname,
        "lastname": lastname,
        "starting-year": startingYear,
    }).catch((error) => {
        console.log(error.message)
    });
}

export const getAllStudents = async () => {
    const studentRef = collection(firestore, "/students");
    const studentQuery = query(studentRef);

    const querySnapshot = await getDocs(studentQuery);
    return querySnapshot.docs.map((doc) => doc.data(), []);
};

export const queryStudentById = async (id) => {
    const studentRef = collection(firestore, "/students");
    const studentQuery = query(studentRef);

    const querySnapshot = await getDocs(studentQuery, where("id", "==", id));
    return querySnapshot.docs.map((doc) => doc.data(), []);
}

export const queryStudentByLastname = async (lastname) => {
    const studentRef = collection(firestore, "/students");
    const studentQuery = query(studentRef);

    const querySnapshot = await getDocs(studentQuery, where("lastname", "==", lastname));
    return querySnapshot.docs.map((doc) => doc.data(), []);
};

export const queryStudentByFirstname = async (firstname) => {
    const studentRef = collection(firestore, "/students");
    const studentQuery = query(studentRef);

    const querySnapshot = await getDocs(studentQuery, where("firstname", "==", firstname));
    return querySnapshot.docs.map((doc) => doc.data(), []);
};

export const queryStudentByStartingYear = async (year) => {
    const studentRef = collection(firestore, "/students");
    const studentQuery = query(studentRef);

    const querySnapshot = await getDocs(studentQuery, where("starting-year", "==", year));
    return querySnapshot.docs.map((doc) => doc.data(), []);
};
