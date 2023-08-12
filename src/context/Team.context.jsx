import { createContext, useState, useEffect } from 'react';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from '../firebase/firebase.config';

export const TeamContext = createContext({
    teamData: []

})

export const TeamContextProvider = ({ children }) => {
    const [teamData, setTeamData] = useState([]);

    useEffect(() => {
        const getData = () => {
            const q = query(collection(db, 'team'));
            onSnapshot(q, (snapshot) => {
                setTeamData(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
            })
        }
        getData();
    }, [])


    return <TeamContext.Provider value={{ teamData }}>{children}</TeamContext.Provider>

}

