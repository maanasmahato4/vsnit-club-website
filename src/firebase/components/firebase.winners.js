import { doc, setDoc, getFirestore, deleteDoc, updateDoc } from 'firebase/firestore';
import { storage } from '../firebase.config';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

const db = getFirestore();

export const addWinner = async (object) => {
    const { id, winnername, eventName, prize, cgsh, grade, section, date, image } = object;
    try {
        const imgRef = ref(storage, `/winners/${image.name + image.size + id}`);
        await uploadBytes(imgRef, image);
        const imgUrl = await getDownloadURL(imgRef);

        const docRef = doc(db, 'winners', id);
        await setDoc(docRef, {
            id,
            winnername,
            eventName,
            prize,
            cgsh,
            grade,
            section,
            date,
            imgUrl

        });
    } catch (error) {
        alert("Error! Please reload again!");
        console.log(error);
    }

}

export const updateWinner = async (object) => {
    const { uid, uwinnerName, ueventName, uprize, ucgsh, ugrade, usection, udate, uimage, imgUrl } = object;
    try {
        if (uimage) {
            const imgRef = ref(storage, `/winners/${uimage.name + uimage.size + uid}`);
            await uploadBytes(imgRef, uimage);
            const UimgUrl = await getDownloadURL(imgRef);
            const docRef = doc(db, 'winners', uid)
            await updateDoc(docRef, {
                id: uid,
                winnername: uwinnerName,
                eventName: ueventName,
                prize: uprize,
                cgsh: ucgsh,
                grade: ugrade,
                section: usection,
                date: udate,
                imgUrl: UimgUrl
            })
        }
        else {
            const docRef = doc(db, 'winners', uid)
            await updateDoc(docRef, {
                id: uid,
                winnername: uwinnerName,
                eventName: ueventName,
                prize: uprize,
                cgsh: ucgsh,
                grade: ugrade,
                section: usection,
                date: udate,
                imgUrl
            });
        };
    } catch (error) {
        alert("Error! Please reload again!");
        console.log(error);
    }


}

export const deleteWinner = async (id) => {
    try {
        await deleteDoc(doc(db, "winners", id));
    } catch (error) {
        alert("Error! Please reload again!");
        console.log(error);
    }

}
