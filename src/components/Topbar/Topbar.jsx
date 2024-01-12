import { FaRegTrashAlt } from "react-icons/fa";
import styles from "./Topbar.module.css";
import Image from "next/image";

const Topbar = ({ selectedChat }) => {
    return (
        <div className={styles.container}>
            <div className={styles.imageContainer}>
                <Image
                    src="/profile.jpg"
                    width="45"
                    height="45"
                    className={styles.image}
                />
                <div>
                    <h4>{selectedChat.name}</h4>
                    <p className={styles.lastseen}>created at 11:10</p>
                </div>
            </div>
        </div>
    );
};

export default Topbar;
