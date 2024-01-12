import Image from "next/image";

import useChatContext from "@/context/ChatContext";
import styles from "./Contacts.module.css";

const Contacts = ({ detail }) => {
    const date = new Date(detail.createdAt);
    const hours = date.getHours();
    const minutes = date.getMinutes();

    const { setSelectedChat } = useChatContext();

    return (
        <div
            className={styles.container}
            onClick={() => setSelectedChat(detail)}
        >
            <div className={styles.imageContainer}>
                <Image
                    src={detail.image}
                    alt="profile"
                    height="40"
                    width="40"
                    className={styles.image}
                />
            </div>
            <div className={styles.userdetailContainer}>
                <div className={styles.nameContainer}>
                    <h4>{detail.name}</h4>
                    <span className={styles.time}>{hours + ":" + minutes}</span>
                </div>
                {detail.from && (
                    <div className={styles.nameContainer}>
                        <p className={styles.lastmsg}>
                            {detail.from} : {detail.lastMessage}
                        </p>
                        <span className={styles.newMsg}>5</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Contacts;
