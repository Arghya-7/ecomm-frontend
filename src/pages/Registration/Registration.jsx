import {useEffect, useState} from "react";
import styles from "./Registration.module.css";
import {Link, useNavigate} from "react-router-dom";

export default function Registration() {
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [status, setStatus] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if(localStorage.getItem("token")) {
            navigate("/");
        }
    }, []);

    const handleRegistration = async (e) => {
        e.preventDefault();
        const data = await fetch(process.env.REACT_APP_BACKEND_URL+"/users/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: email.substring(0, email.indexOf("@")),
                email: email,
                password: password,
                name: name,
                phone: phone,
                address: address
            })
        });
        console.log(data);
        if(data.status === 200){
            setStatus("Registration Successful!");
        } else {
            const response = await data.json();
            console.log(response);
            setStatus(response.message);
        }
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Registration page</h2>
            <h5>{status}</h5>
            <form onSubmit={handleRegistration} className={styles.form}>
                <input
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={styles.input}
                />
                <input
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={styles.input}
                />

                <input
                    type="text"
                    placeholder="Enter your address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className={styles.input}
                />

                <input
                    type="text"
                    placeholder="Ente contact number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={styles.input}
                />

                <input
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={styles.input}
                />

                <input
                    type="password"
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={styles.input}
                />

                <button type="submit" className={styles.button} onClick={handleRegistration}>
                    Register
                </button>
            </form>
            <Link to="/login" className={styles.alignRight}>Login</Link>
        </div>
    );
}
