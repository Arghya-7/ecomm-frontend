import {useEffect, useState} from "react";
import styles from "./Login.module.css";
import {Link, useNavigate} from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [state, setState] = useState("")
    useEffect(() => {
        const user = localStorage.getItem("token");
        if(user) {
            console.log(user);
            console.log(localStorage.getItem("token"))
            navigate("/");
        }
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();
        console.log("Email:", email);
        console.log("Password:", password);
        const createToken = async (email, password) => {
            const response = await fetch(process.env.REACT_APP_BACKEND_URL + "/users/login", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });
            console.log(response);
            if (response.status === 200) {
                const data = await response.json();
                console.log(data);
                localStorage.setItem("token", data.token);
                console.log(localStorage.getItem("token"));
                setState("success");
                navigate("/");
            } else {
                const error = await response.json();
                setState(error.message);
            }
        }
        createToken(email, password);
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Login</h2>

            <form onSubmit={handleLogin} className={styles.form}>
                <h3>{state}</h3>
                <input
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={styles.input}
                />

                <input
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={styles.input}
                />

                <button type="submit" className={styles.button}>
                    Login
                </button>
            </form>
            <Link to="/register" className={styles.alignRight}>Register</Link>
        </div>
    );
}
