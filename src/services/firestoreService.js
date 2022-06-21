import { addDoc, collection, doc, query, where, orderBy, getDocsFromServer, updateDoc, getDoc } from 'firebase/firestore';
import { firestore } from '../config/firebase.config';
import { getImageFromSource, getDefaultAvatar } from './storageService';
import { deleteUser, getAuth } from 'firebase/auth';

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
        throw e;
    }
}

export const updateStudentInfo = async (docPath, data) => {
    const docRef = doc(firestore, docPath);

    const serverData = {
        ...data,
        _new: '0',
    };

    try {
        await updateDoc(docRef, serverData);
    } catch (e) {
        throw e;
    }
}

export const getAllStudents = async () => {
    try {
        const students = await getDocsFromServer(
            query(collection(firestore, 'students'), where('_new', '==', '0'), where('_delete', '==', '0'), orderBy('id'))
        );

        let data = students?.docs.map(doc => doc.data());

        await Promise.all(data.map(async (student) => {
            student.avatar = await getAvatar(student);
        }, []))

        return data;
    } catch (e) {
        throw e;
    }
};

export const getStudentPathByEmail = async (email) => {
    const studentRef = collection(firestore, 'students');
    const studentQuery = query(studentRef, where('email', '==', email), where('_new', '==', '0'), where('_delete', '==', '0'));

    try {
        const querySnapshot = await getDocsFromServer(studentQuery);
        return studentRef.path + '/' + querySnapshot.docs[0].id;
    } catch (e) {
        throw e;
    }
}

export const getStudentDataFromPath = async (docPath) => {
    try {
        const docRef = doc(firestore, docPath);

        let data = (await getDoc(docRef))?.data();
        data.avatar = await getAvatar(data);

        return data;
    } catch (e) {
        throw e;
    }
}

export const deleteStudentAccount = async (email, user) => {
    try {
        const docPath = await getStudentPathByEmail(email);
        const docRef = doc(firestore, docPath);

        await updateDoc(docRef, { _delete: '1' });

        const auth = getAuth();
        await deleteUser(auth.currentUser);

        return true;
    } catch (e) {
        throw e;
    }
}

const getAvatar = async (data) => {
    try {
        return data.avatar ? await getImageFromSource(data.avatar) : await getDefaultAvatar();
    } catch (e) {
        throw e;
    }
}