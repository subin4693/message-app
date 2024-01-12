"use client";
import React, { useState, useEffect } from "react";
import styles from "./CreateChatBox.module.css";
import Contacts from ".././Contacts/Contacts";
import useDebounce from "@/hooks/use-debounce";

const CreateChatBox = ({ setCreateChatOpen }) => {
    const [name, setName] = useState("");
    const [users, setUsers] = useState();
    const [chatType, setChatType] = useState("private");

    const debouncedSearchValue = useDebounce(name, 1000);

    const fetchData = async () => {
        if (name.length == 0) return;
        try {
            const res = await fetch(
                process.env.NEXT_PUBLIC_BASE_URL + "/search?name=" + name,
            );
            const data = await res.json();

            setUsers(data.user);
        } catch (error) {
            alert(error);
        }
    };

    const handleChange = (e) => {
        setName(e.target.value);
    };

    const createChat = async (_id) => {
        const res = await fetch(
            process.env.NEXT_PUBLIC_BASE_URL + "/chat/private",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ user: _id }),
            },
        );
        const ret = await res.json();

        setCreateChatOpen(false);
    };

    useEffect(() => {
        fetchData();
    }, [debouncedSearchValue]);

    return (
        <div
            className={styles.container}
            onClick={() => setCreateChatOpen(false)}
        >
            <div
                className={styles.centerdiv}
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    className={styles.close}
                    onClick={() => setCreateChatOpen(false)}
                >
                    X
                </button>
                <input
                    type="text"
                    placeholder="search user"
                    className={styles.input}
                    value={name}
                    onChange={handleChange}
                />
                <br />
                <br />
                <div>
                    <input
                        type="radio"
                        id="private"
                        value="private"
                        name="chattype"
                        onChange={() => setChatType("private")}
                        defaultChecked
                    />
                    <label htmlFor="private">Private</label> &nbsp;&nbsp;
                    <input
                        type="radio"
                        id="group"
                        value="group"
                        name="chattype"
                        onChange={() => setChatType("group")}
                    />
                    <label htmlFor="group">Group</label>
                </div>
                <div>
                    {users &&
                        users.map((detail) => (
                            <div onClick={() => createChat(detail._id)}>
                                <Contacts detail={detail} key={detail._id} />
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default CreateChatBox;
