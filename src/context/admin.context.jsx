import { createContext, useState, useEffect } from 'react';
import { AuthState } from '../firebase/firebase.config';

export const AdminContext = createContext({
    adminState: null,
    setAdminState: () => null

})


export const AdminContextProvider = ({ children }) => {
    const [adminState, setAdminState] = useState(null)
    useEffect(() => {
        const unSub = AuthState(user => {
            if (user) {
                setAdminState(user);
            }
        })

        return unSub;
    }, [])

    const values = { adminState, setAdminState }
    return <AdminContext.Provider value={values}>{children}</AdminContext.Provider>
}
