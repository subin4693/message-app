import { signup } from "@/lib/actions";
import Link from "next/link";
import styles from "./signup.module.css";

import Button from "@/components/Button/Button";

const Signin = () => {
    return (
        <section className={styles.container}>
            <form action={signup} className={styles.formcontainer}>
                <h3>Sign up</h3>
                <br />
                <br />
                <input
                    type="text"
                    name="name"
                    placeholder="Username"
                    className={styles.input}
                />

                <br />
                <br />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className={styles.input}
                />

                <br />
                <br />
                <input
                    type="password"
                    name="confirmpassword"
                    placeholder="Confirm password"
                    className={styles.input}
                />

                <br />
                <br />
                <Button type={"submit"} text={"Signin"} />
                <p className={styles.para}>
                    Already have an account <Link href="/signin">Signin</Link>
                </p>
            </form>
        </section>
    );
};

export default Signin;
