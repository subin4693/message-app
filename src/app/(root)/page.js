"use client";
import useChatContext from "@/context/ChatContext";

import Sidebar from "@/components/Sidebar/Sidebar";
import Chat from "@/components/Chat/Chat";
import styles from "./Home.module.css";

const Home = () => {
    const { selectedChat } = useChatContext();

    return (
        <main className={styles.maincontainer}>
            <Sidebar />
            {selectedChat ? (
                <Chat selectedChat={selectedChat} />
            ) : (
                <div>Loading...</div>
            )}
        </main>
    );
};

export default Home;
