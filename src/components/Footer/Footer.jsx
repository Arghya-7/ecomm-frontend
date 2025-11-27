import styles from "./Footer.module.css";

export default function Footer() {
    return (
        <footer className={styles.footer}>

            {/* Logo / Intro Section */}
            <div className={styles.section}>
                <div className={styles.logo}>Ecommerce application</div>
                <p style={{ maxWidth: "250px", lineHeight: "1.5" }}>
                    Your opinion is our priority
                </p>
            </div>

            {/* Product Links */}
            <div className={styles.section}>
                <h4 className={styles.title}>Product</h4>
                <a className={styles.link} href="#">Features</a>
                <a className={styles.link} href="#">Pricing</a>
                <a className={styles.link} href="#">Integrations</a>
                <a className={styles.link} href="#">Documentation</a>
            </div>

            {/* Company Links */}
            <div className={styles.section}>
                <h4 className={styles.title}>Company</h4>
                <a className={styles.link} href="#">About Us</a>
                <a className={styles.link} href="#">Blog</a>
                <a className={styles.link} href="#">Careers</a>
                <a className={styles.link} href="#">Contact</a>
            </div>

            {/* Support Links */}
            <div className={styles.section}>
                <h4 className={styles.title}>Support</h4>
                <a className={styles.link} href="#">Help Center</a>
                <a className={styles.link} href="#">API Docs</a>
                <a className={styles.link} href="#">Status</a>
                <a className={styles.link} href="#">Privacy Policy</a>
            </div>

            {/* Bottom Text */}
            <div className={styles.bottom}>
                © {new Date().getFullYear()} MyApp. All rights reserved.
            </div>
        </footer>
    );
}
