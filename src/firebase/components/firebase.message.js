import { db } from '../firebase.config';
import { setDoc, doc, deleteDoc } from 'firebase/firestore';

export const addMessage = async (object) => {
    const { id, username, email, phone, subject, message, date } = object;
    try {
        const docRef = doc(db, 'messages', id);
        await setDoc(docRef, {
            id,
            username,
            email,
            phone,
            subject,
            message,
            date
        })
    } catch (error) {
        alert("Error! Please reload again!");
        console.log(error);
    }


}


export const deleteMessage = async (id) => {
    try {
        await deleteDoc(doc(db, 'messages', id));
    } catch (error) {
        alert("Error! Please reload again!");
        console.log(error);
    }

}