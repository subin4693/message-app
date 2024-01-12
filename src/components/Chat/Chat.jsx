import Topbar from "../Topbar/Topbar";
import styles from "./Chat.module.css";
import { BsEmojiSmile } from "react-icons/bs";
import { MdSend } from "react-icons/md";
import Image from "next/image";

const Chat = ({ selectedChat }) => {
    const messages = [
        {
            message: "Text message",
            time: "11:30",
            from: "him",
            image: "/profile.jpg",
            isgroup: true,
        },
        {
            message: "Text message",
            time: "11:30",
            from: "you",
            image: "/profile.jpg",
            isgroup: true,
        },
        {
            message: "Text message",
            time: "11:30",
            from: "him",
            image: "/profile.jpg",
            isgroup: true,
        },
    ];

    return (
        <div className={styles.container}>
            <Topbar selectedChat={selectedChat} />
            <div className={styles.chatcontainer}>
                <div className={styles.messageContainer}>
                    {messages.map((val) => (
                        <div
                            className={`${styles.messagewrapper} ${
                                val.from === "you" && styles.you
                            }`}
                        >
                            {val.isgroup && val.from !== "you" && (
                                <Image
                                    src={val.image}
                                    width="30"
                                    height="30"
                                    className={styles.image}
                                />
                            )}
                            <div className={styles.message}>{val.message}</div>
                            {val.isgroup && val.from === "you" && (
                                <Image
                                    src={val.image}
                                    width="30"
                                    height="30"
                                    className={styles.image}
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles.inputcontainer}>
                <div className={styles.inputwraper}>
                    <BsEmojiSmile size="30" />
                    <input type="text" className={styles.input} />
                    <MdSend size="30" />
                </div>
            </div>
        </div>
    );
};

export default Chat;
