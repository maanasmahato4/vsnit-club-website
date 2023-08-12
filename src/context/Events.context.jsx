import { useState, createContext, useEffect } from 'react';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase/firebase.config';


export const EventsContext = createContext({
    eventsData: []
})

export const EventsContextProvider = ({ children }) => {
    const [eventsData, setEventsData] = useState([]);
    useEffect(() => {
        const fetchData = () => {
            const collectionRef = query(collection(db, 'events'), orderBy('endDate', 'desc'));
            onSnapshot(collectionRef, (snapshot) => {
                setEventsData(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
            })
        }
        fetchData();
    }, [])

    return <EventsContext.Provider value={{ eventsData }}>
        {children}
    </EventsContext.Provider>
}