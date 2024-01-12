import styles from "./Button.module.css";

const Button = ({ type, text }) => {
    return (
        <button type={type} className={styles.btn}>
            {text}
        </button>
    );
};

export default Button;
