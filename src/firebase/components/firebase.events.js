import { doc, getFirestore, setDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import { uploadBytes, getDownloadURL, ref } from 'firebase/storage';
import { storage } from '../firebase.config';

const db = getFirestore();

export const addEvents = async (object) => {
    const { eventId, eventName, eventDesc, eventStartDate, eventEndDate, eventStatus, infoUrl, winnerName, winnerSchool, winnerImage, image, formUrl } = object;
    try {
        const docRef = doc(db, 'events', eventId);

        const imgRef = ref(storage, `/events/${image.name + image.size + eventId}`);
        await uploadBytes(imgRef, image);
        const imgUrl = await getDownloadURL(imgRef);

        const winnerRef = ref(storage, `/eventswinners/${winnerImage.name + winnerImage.size + eventId}`);
        await uploadBytes(winnerRef, winnerImage);
        const winnerUrl = await getDownloadURL(winnerRef);

        await setDoc(docRef, {
            id: eventId,
            name: eventName,
            startDate: eventStartDate,
            endDate: eventEndDate,
            desc: eventDesc,
            status: eventStatus,
            infoUrl,
            formUrl,
            winnerName,
            winnerSchool,
            winnerUrl,
            imgUrl
        })
    } catch (error) {
        alert("Error! Please reload again!");
        console.log(error);
    }

}

export const updateEvent = async (object) => {
    const { uid, ueventName, ueventDesc, ueventStartDate, ueventEndDate, ueventStatus, uinfoUrl, uwinnerName, uwinnerSchool, uwinnerImage, uwinnerUrl, uimage, imgUrl, uformUrl } = object;
    try {
        if (uimage) {
            const imgRef = ref(storage, `/events/${uimage.name + uimage.size + uid}`);
            const winnerRef = ref(storage, `/eventswinners/${uwinnerImage.name + uwinnerImage.size + uid}`);
            await uploadBytes(imgRef, uimage);
            await uploadBytes(winnerRef, uwinnerImage);
            const UimgUrl = await getDownloadURL(imgRef);
            const UwinnerUrl = await getDownloadURL(winnerRef);
            const docRef = doc(db, 'events', uid)
            await updateDoc(docRef, {
                eventId: uid,
                name: ueventName,
                startDate: ueventStartDate,
                endDate: ueventEndDate,
                desc: ueventDesc,
                status: ueventStatus,
                infoUrl: uinfoUrl,
                formUrl: uformUrl,
                winnerName: uwinnerName,
                winnerSchool: uwinnerSchool,
                winnerUrl: UwinnerUrl,
                imgUrl: UimgUrl
            })
        }
        else {
            const docRef = doc(db, 'events', uid)
            await updateDoc(docRef, {
                eventId: uid,
                name: ueventName,
                startDate: ueventStartDate,
                endDate: ueventEndDate,
                desc: ueventDesc,
                status: ueventStatus,
                infoUrl: uinfoUrl,
                formUrl: uformUrl,
                winnerName: uwinnerName,
                winnerSchool: uwinnerSchool,
                winnerUrl: uwinnerUrl,
                imgUrl
            })
        }
    } catch (error) {
        alert("Error! Please reload again!");
        console.log(error);
    }

}

export const deleteEvent = async (id) => {
    try {
        await deleteDoc(doc(db, "events", id));
    } catch (error) {
        alert("Error! Please reload again!");
        console.log(error);
    }

}
