import { createContext, useState, useEffect } from 'react';
import { db } from '../firebase/firebase.config';
import { query, collection, onSnapshot, orderBy } from 'firebase/firestore';
export const WinnersContext = createContext({
    winnersData: []

})

export const WinnersContextProvider = ({ children }) => {
    const [winnersData, setWinnersData] = useState([]);

    useEffect(() => {
        const fetchData = () => {
            const q = query(collection(db, "winners"), orderBy("date", "desc"));
            onSnapshot(q, (snapshot) => {
                setWinnersData(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
            })
        }
        fetchData();
    }, [])
    return <WinnersContext.Provider value={{ winnersData }}>{children}</WinnersContext.Provider>

}