import { doc, setDoc, getFirestore, deleteDoc, updateDoc } from 'firebase/firestore';
import { storage } from '../firebase.config';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

const db = getFirestore();

export const addTeamMember = async (object) => {
    const { id, membername, position, fbUrl, grade, image } = object;
    try {
        const imgRef = ref(storage, `team/${image.name + image.size + id}`);
        await uploadBytes(imgRef, image);
        const imgUrl = await getDownloadURL(imgRef);

        const docRef = doc(db, "team", id);
        await setDoc(docRef, {
            id,
            membername,
            position,
            fbUrl,
            grade,
            imgUrl
        })
    } catch (error) {
        alert("Error! Please reload again!");
        console.log(error);
    }

}

export const updateTeamMember = async (object) => {
    const { uid, umembername, umemberposition, ufbUrl, ugrade, uimage, imgUrl } = object;
    try {
        if (uimage) {
            const imgRef = ref(storage, `/team/${uimage.name + uimage.size + uid}`);
            await uploadBytes(imgRef, uimage);
            const UimgUrl = await getDownloadURL(imgRef);
            const docRef = doc(db, 'team', uid)
            await updateDoc(docRef, {
                id: uid,
                membername: umembername,
                position: umemberposition,
                fbUrl: ufbUrl,
                grade: ugrade,
                imgUrl: UimgUrl
            })
        }
        else {
            const docRef = doc(db, 'team', uid)
            await updateDoc(docRef, {
                id: uid,
                membername: umembername,
                position: umemberposition,
                grade: ugrade,
                fbUrl: ufbUrl,
                imgUrl
            })
        }
    } catch (error) {
        alert("Error! Please reload again!");
        console.log(error);
    }


}

export const deleteMember = async (id) => {
    try {
        await deleteDoc(doc(db, "team", id));
    } catch (error) {
        alert("Error! Please reload again!");
        console.log(error);
    }

}
