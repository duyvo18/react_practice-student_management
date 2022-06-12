import { addDoc, collection, doc, query, where, orderBy, getDocsFromServer, updateDoc } from 'firebase/firestore';
import { firestore } from '../config/firebase.config';
import { getImageFromSource, getDefaultAvatar } from './storageService'

export const addNewStudent = async (email) => {
    const serverData = {
        email: email,
        _new: '1',
        avatar: ''
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
        _new: data._new ?? '1'
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

export const queryStudentByEmail = async (email) => {
    const studentRef = collection(firestore, 'students');
    const studentQuery = query(studentRef);

    try {
        const querySnapshot = await getDocsFromServer(studentQuery, where('email', '==', email));
        return studentRef.path + '/' + querySnapshot.docs[0].id;
    } catch (e) {
        // TODO: resolve
        console.log(e)
    }
}

const getAvatar = async (data) => {
    return data.avatar ? await getImageFromSource(data.avatar) : await getDefaultAvatar();
}