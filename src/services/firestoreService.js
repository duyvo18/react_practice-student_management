import { addDoc, collection, doc, query, where, orderBy, getDocsFromServer, updateDoc, getDoc } from 'firebase/firestore';
import { firestore } from '../config/firebase.config';
import { getImageFromSource, getDefaultAvatar } from './storageService'

export const addNewStudent = async (email) => {
    const serverData = {
        email: email,
        avatar: '',
        _new: '1',
        _delete: '0',
    };

    const studentRef = collection(firestore, 'students');
    try {
        const docRef = await addDoc(studentRef, serverData)
        return docRef.path;
    } catch (e) {
        // TODO: resolve
        console.log(e)
    }
}

export const updateStudentInfo = async (docPath, data) => {
    const docRef = doc(firestore, docPath);

    const serverData = {
        id: data.id ?? '',
        firstname: data.firstname ?? '',
        lastname: data.lastname ?? '',
        startingYear: data.startingYear ?? '',
        avatar: data.imageSrc ?? '',
        details: data.details ?? '',
        _new: '0',
    };

    await updateDoc(docRef, serverData);
}

export const getAllStudents = async () => {
    try {
        const students = await getDocsFromServer(
            query(collection(firestore, 'students'), where('_new', '==', '0'), orderBy('id'))
        );

        let data = students?.docs.map(doc => doc.data());

        await Promise.all(data.map(async (student) => {
            student.avatar = await getAvatar(student);
        }, []))

        return data;
    } catch (e) {
        // TODO: resolve
        console.log(e);
    }
};

export const getStudentPathByEmail = async (email) => {
    const studentRef = collection(firestore, 'students');
    const studentQuery = query(studentRef, where('email', '==', email));

    try {
        const querySnapshot = await getDocsFromServer(studentQuery);
        return studentRef.path + '/' + querySnapshot.docs[0].id;
    } catch (e) {
        // TODO: resolve
        console.log(e)
    }
}

export const getStudentDataFromPath = async (docPath) => {
    try {
        const docRef = doc(firestore, docPath);

        let data = (await getDoc(docRef))?.data();
        data.avatar = await getAvatar(data);

        return data;
    } catch (e) {
        // TODO: resolve
        console.log(e);
    }
}

export const deleteStudentAccount = async (studentEmail) => {
    const docPath = getStudentPathByEmail(studentEmail);
    const docRef = doc(firestore, docPath);

    updateDoc(docRef, { _delete: '1' });

    // TODO: Disable Auth
}

const getAvatar = async (data) => {
    return data.avatar ? await getImageFromSource(data.avatar) : await getDefaultAvatar();
}