import {useEffect} from "react";
import styles from "./Logout.module.css";
import {Link} from "react-router-dom";
function Logout() {
    useEffect(()=>{
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    })
    return (<div className={styles.container}>
            <h1>Logged out Successfully</h1>
            <Link className={styles.alignRight} to="/login">Login again</Link>
        </div>);
}

export default Logout;