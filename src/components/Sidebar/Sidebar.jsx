"use client";
import { useState, useEffect } from "react";
import { IoIosSearch } from "react-icons/io";

import Contacts from "@/components/Contacts/Contacts";
import CreateChatBox from ".././CreateChatBox/CreateChatBox";
import styles from "./Sidebar.module.css";

const Sidebar = ({ setSelectedChat }) => {
    const [createChatOpen, setCreateChatOpen] = useState(false);

    useEffect(() => {
        const fetchChats = async () => {
            const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/chat");
            const ret = await res.json();
            console.log(ret);
        };
        fetchChats();
    }, []);

    const chats = [
        {
            name: "subin",
            profile: "/profile.jpg",
            lastMessage: "hello world",
            from: "subin",
            time: "11:20",
        },
        {
            name: "ajen",
            profile: "/profile.jpg",
            lastMessage: "hello world",
            from: "you",
            time: "10:00",
        },
        {
            name: "athul",
            profile: "/profile.jpg",
            lastMessage: "hello world",
            from: "subin",
            time: "11:20",
        },
        {
            name: "princy",
            profile: "/profile.jpg",
            lastMessage: "hello world",
            from: "subin",
            time: "11:20",
        },
    ];
    return (
        <div className={styles.container}>
            <div className={styles.inputContainer}>
                <IoIosSearch className={styles.icon} />
                <input
                    type="text"
                    placeholder="search"
                    className={styles.input}
                />
            </div>
            <button
                className={styles.createchatBtn}
                onClick={() => setCreateChatOpen(true)}
            >
                +
            </button>
            <div>
                {chats.map((detail, index) => (
                    <Contacts detail={detail} key={index} />
                ))}
            </div>
            {createChatOpen && (
                <CreateChatBox setCreateChatOpen={setCreateChatOpen} />
            )}
        </div>
    );
};

export default Sidebar;
