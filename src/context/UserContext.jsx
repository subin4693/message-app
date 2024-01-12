"use client";
import { createContext, useContext, useEffect, useState } from "react";

const userContext = createContext({ name: null, image: null, _id: null });

export function UserContextProvider({ children }) {
    const [user, setUser] = useState();

    return (
        <userContext.Provider value={{ user, setUser }}>
            {children}
        </userContext.Provider>
    );
}

export default function useUser() {
    const { user, setUser } = useContext(userContext);

    return { user, setUser };
}
