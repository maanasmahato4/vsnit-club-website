import { createContext, useState, useEffect } from 'react';
import { db } from '../firebase/firebase.config';
import { query, collection, onSnapshot } from 'firebase/firestore';

export const YoutubeContext = createContext({
    ytVideos: []

})

export const YoutubeContextProvider = ({ children }) => {
    const [ytVideos, setYTVideos] = useState([]);

    useEffect(() => {
        const fetchData = () => {
            const q = query(collection(db, 'youtube'));
            onSnapshot(q, (snapshot) => {
                setYTVideos(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
            })
        }
        fetchData();
    }, [])
    return <YoutubeContext.Provider value={{ ytVideos }}>{children}</YoutubeContext.Provider>

}