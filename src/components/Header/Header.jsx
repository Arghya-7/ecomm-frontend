import { useState} from "react";
import  styles from "./header.module.css";
import {Link} from "react-router-dom";
import Clock from "../Clock/Clock";
import logout from "../Logout/logout";
function Header() {
    const [open, setOpen] = useState(false);

    return (
        <header className={styles.navbar}>

            <div className={styles.logo}>Ecommerce application</div>
            <center>
                <Clock />
            </center>
            {/* DESKTOP INLINE LINKS */}
            <ul className={styles.links}>
                <Link onClick={logout} to={"/login"}>Logout</Link>
                <Link to="/cart" className={styles.linkItem}>Cart</Link>
                <Link to="/home" className={styles.linksItem}>Home</Link>
                <Link to="/profile" className={styles.linksItem}>View Profile</Link>
                <Link to="/order" className={styles.linksItem}>Orders</Link>
            </ul>

            {/* MOBILE SLIDE MENU */}
            <div className={`${styles.mobileMenu} ${open ? styles.open : ""}`}>
                <Link to="/home" className={styles.linksItem} onClick={() => setOpen(false)}>Home</Link>
                <Link to="/features" className={styles.linksItem} onClick={() => setOpen(false)}>Features</Link>
                <Link to="/order" className={styles.linksItem} onClick={() => setOpen(false)}>orders</Link>
            </div>

            {/* HAMBURGER BUTTON */}
            <button
                className={styles.hamburger}
                onClick={() => setOpen(!open)}
            >
                <span className={styles.bar}></span>
                <span className={styles.bar}></span>
                <span className={styles.bar}></span>
            </button>
        </header>
    )
}

export default Header