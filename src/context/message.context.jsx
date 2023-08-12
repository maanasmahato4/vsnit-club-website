import { createContext, useState, useEffect } from 'react';

export const MessageContext = createContext({
    messages: []
})

export const MessageContextProvide = ({ children }) => {
    const [messages, setMessages] = useState([]);
    const value = { messages }
    return <MessageContext.Provider value={value}>
        {children}
    </MessageContext.Provider>
}