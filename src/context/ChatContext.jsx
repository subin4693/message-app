"use client";
import { useEffect, createContext, useState, useContext } from "react";

const chatContext = createContext({ name: null, _id: null, image: null });

export function ChatContextProvider({ children }) {
    const [selectedChat, setSelectedChat] = useState(null);

    return (
        <chatContext.Provider value={{ selectedChat, setSelectedChat }}>
            {children}
        </chatContext.Provider>
    );
}

export default function useChatContext() {
    const { selectedChat, setSelectedChat } = useContext(chatContext);
    return { selectedChat, setSelectedChat };
}
