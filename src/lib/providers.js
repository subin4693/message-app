"use client";
import { ChatContextProvider } from "@/context/ChatContext";
import { UserContextProvider } from "@/context/UserContext";

const Providers = ({ children }) => {
    return (
        <ChatContextProvider>
            <UserContextProvider>{children}</UserContextProvider>
        </ChatContextProvider>
    );
};

export default Providers;
