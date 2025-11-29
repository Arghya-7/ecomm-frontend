import {useEffect, useState} from "react";
import  styles from "./header.module.css";
import {Link} from "react-router-dom";
function Header() {
    const [open, setOpen] = useState(false);

    return (
        <header className={styles.navbar}>

            <div className={styles.logo}>Ecommerce application</div>

            {/* DESKTOP INLINE LINKS */}
            <ul className={styles.links}>
                <Link to="/home" className={styles.linksItem}>Home</Link>
                <Link to="/features" className={styles.linksItem}>Features</Link>
                <Link to="/about" className={styles.linksItem}>About</Link>
            </ul>

            {/* MOBILE SLIDE MENU */}
            <div className={`${styles.mobileMenu} ${open ? styles.open : ""}`}>
                <Link to="/home" className={styles.linksItem} onClick={() => setOpen(false)}>Home</Link>
                <Link to="/features" className={styles.linksItem} onClick={() => setOpen(false)}>Features</Link>
                <Link to="/about" className={styles.linksItem} onClick={() => setOpen(false)}>About</Link>
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