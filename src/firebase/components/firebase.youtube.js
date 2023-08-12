import { doc, setDoc, getFirestore, deleteDoc, updateDoc } from 'firebase/firestore';

const db = getFirestore();

export const addVideo = async (object) => {

    const { id, title, vidUrl } = object;
    try {
        const docRef = doc(db, 'youtube', id);
        await setDoc(docRef, {
            id,
            title,
            vidUrl

        })
    } catch (error) {
        alert("Error! Please reload again!");
        console.log(error);
    }

}

export const updateYoutubeVideo = async (object) => {
    const { uid, utitle, uvidUrl } = object;
    try {
        const docRef = doc(db, 'youtube', uid)
        await updateDoc(docRef, {
            id: uid,
            title: utitle,
            vidUrl: uvidUrl

        });
    } catch (error) {
        alert("Error! Please reload again!");
        console.log(error);
    }


}

export const deleteVideo = async (title) => {
    try {
        await deleteDoc(doc(db, "youtube", title));
    } catch (error) {
        alert("Error! Please reload again!");
        console.log(error);
    }
}
