import { signin } from "@/lib/actions";
import Link from "next/link";
import styles from "./signin.module.css";

import Button from "@/components/Button/Button";

const Signin = () => {
    return (
        <section className={styles.container}>
            <form action={signin} className={styles.formcontainer}>
                <h3>Sign in</h3>
                <br />
                <input
                    type="text"
                    placeholder="Username"
                    name="name"
                    className={styles.input}
                />

                <br />
                <br />
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    className={styles.input}
                />

                <br />
                <br />
                <Button type={"submit"} text={"Signin"} />
                <p className={styles.para}>
                    Don't have an account <Link href="/signup">Signup</Link>
                </p>
            </form>
        </section>
    );
};

export default Signin;
